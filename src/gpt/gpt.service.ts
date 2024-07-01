import { Inject, Injectable } from '@nestjs/common';
import {
  FlatsAnswersService,
  FlatsGPTService,
  FlatsService,
} from 'src/flats/flats.service';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { LoggerService } from 'src/logger/logger.service';
import { FlatsGPTStatus } from 'src/interfaces/flat-gpt-record';
import { Models, generateChainAndInvoke } from './helpers/langchain-wrapper';
import { FlatsData } from 'src/flats/entities/flats-data.entity';
import {
  balconySummaryPrompt,
  basementSummaryPrompt,
  elevatorSummaryPrompt,
  garageSummaryPrompt,
  gardenSummaryPrompt,
  kitchenSummaryPrompt,
  legalStatusSummaryPrompt,
  modernizationSummaryPrompt,
  monitoringSummaryPrompt,
  outbuildingSummaryPrompt,
  rentSummaryPrompt,
  technologySummaryPrompt,
} from './prompts/flats/summaries';
import {
  balconyRatingPrompt,
  basementRatingPrompt,
  elevatorRatingPrompt,
  garageRatingPrompt,
  gardenRatingPrompt,
  kitchenRatingPrompt,
  legalStatusRatingPrompt,
  modernizationRatingPrompt,
  monitoringRatingPrompt,
  outbuildingRatingPrompt,
  rentRatingPrompt,
  technologyRatingPrompt,
} from './prompts/flats/ratings';
import {
  translateFromENtoPLPrompt,
  translateFromPLtoENPrompt,
} from './prompts/flats/translation';
import { rateParams } from './helpers/params.rating';

type FlatsDataKeys =
  | keyof FlatsData
  | 'technology'
  | 'garage'
  | 'modernization'
  | 'outbuilding'
  | 'kitchen'
  | 'alarm';

@Injectable()
export class GptService {
  private outputParser: StringOutputParser;
  private flatsDataInstance: FlatsData;

  constructor(
    @Inject(FlatsService) private flatsService: FlatsService,
    @Inject(FlatsAnswersService)
    private flatsAnswerService: FlatsAnswersService,
    @Inject(FlatsGPTService) private flatsGPTService: FlatsGPTService,
  ) {
    this.outputParser = new StringOutputParser();
    this.flatsDataInstance = new FlatsData();
  }

  /* Logger initialization  */
  private readonly logger = new LoggerService(GptService.name);

  /* Init */
  creativity = 0.0;
  modelName: Models = 'gpt-4o';
  translationModelName: Models = 'gpt-3.5-turbo';

  private updateStatus(id: string, status: FlatsGPTStatus): void {
    this.flatsGPTService.setStatus({ id, status });
    this.logger.log(
      `Changing status to ${status.toUpperCase()} for task with id: ${id}`,
      GptService.name,
    );
  }

  private async translateWithGPT(
    text: string,
    translation: 'en_pl' | 'pl_en',
  ): Promise<string> {
    let dictionary;

    switch (translation) {
      case 'en_pl':
        dictionary = translateFromENtoPLPrompt;
        break;
      case 'pl_en':
        dictionary = translateFromPLtoENPrompt;
        break;
    }

    if (text && (text.length === 0 || text.includes('!NO TRANSLATION!'))) {
      return '';
    } else {
      return await generateChainAndInvoke(
        dictionary,
        this.translationModelName,
        this.creativity,
        { text },
      );
    }
  }

  private simpleYesNoTranslate(
    text: string,
  ): 'yes' | 'no' | 'information not provided.' {
    if (text === 'tak') return 'yes';
    if (text === 'nie') return 'no';
    return 'information not provided.';
  }

  private async rateProperty(
    id: string,
    property: FlatsDataKeys,
    promptSummary: string,
    promptRating: string,
    summaryParams?: { [key: string]: string },
    ratingParams?: { [key: string]: string },
  ) {
    this.logger.log(`Assessing ${property.toUpperCase()} (${id})`, 'AI-Rater');
    let summary = '';
    let rating = '';

    const propertyLemma = `${property}Lemma`;
    const user = undefined;

    const lemma = await this.flatsService.getOneRecordByID(id);

    if (
      typeof property !== 'number' && // FIXME: is this necessary?
      ((lemma[propertyLemma] && lemma[propertyLemma] !== '') ||
        (summaryParams && Object.keys(summaryParams).length > 0))
    ) {
      const translatedLemma = await this.translateWithGPT(
        lemma[propertyLemma],
        'pl_en',
      );
      summary = await generateChainAndInvoke(
        promptSummary,
        this.modelName,
        this.creativity,
        { lemma: translatedLemma, ...summaryParams },
      );

      if (
        !Object.values(ratingParams).every(
          (value) => value == null || value === '',
        )
      ) {
        rating = await generateChainAndInvoke(
          promptRating,
          this.modelName,
          this.creativity,
          { summary, ...ratingParams },
        );
      }

      this.logger.debug(
        `Rating for ${property.toUpperCase()} (${id}):\n${rating}`,
        'AI-Rater',
      );
      this.logger.debug(
        `Summary for ${property.toUpperCase()} (${id}):\n${summary}`,
        'AI-Rater',
      );
    } else {
      this.logger.debug(
        `Skipping rating for ${property.toUpperCase()} (${id}). No text to rate for this property`,
        'AI-Rater',
      );
      rating = '-9';
      summary = 'Pominięto, brak tekstu do oceny.';
    }

    await this.flatsGPTService.createOrUpdateGPTAnswer(id, user, {
      flatID: id,
      [`${property}Rating`]: isNaN(Number(rating)) ? -9 : Number(rating),
      [`${property}Summary`]: Boolean(summary) // summary, lemma[propertyLemma]?
        ? await this.translateWithGPT(summary, 'en_pl')
        : null,
    });

    return {
      rating: Number(rating) || -9,
      summary: summary,
    };
  }

  async rateFlatOffer(id: string) {
    // Create empty records for answers and gpt if not exists to avoid sql errors
    if (!(await this.flatsAnswerService.getOneRecordByID(id))) {
      await this.flatsAnswerService.createOrUpdateAnswer(id, 'ai', {
        flatID: id,
      });
    }
    if (!(await this.flatsGPTService.getOneRecordByID(id))) {
      await this.flatsGPTService.createOrUpdateGPTAnswer(id, 'ai', {
        flatID: id,
      });
    }

    /* Change status of the task */
    this.updateStatus(id, FlatsGPTStatus.PENDING);

    // Basic data from scraped
    const {
      description,
      yearBuilt,
      material,
      buildingType,
      floorsNumber,
      legalStatus,
      balconyQuantity,
      terracesQuantity,
      loggiasQuantity,
      frenchBalconyQuantity,
      storageRoom,
      attic,
      basement,
      garden,
      priceParkingUnderground,
      priceParkingGround,
      security,
      guardedArea,
      guardedEstate,
      securityControl,
      kitchenType,
      rent,
    } = await this.flatsService.getOneRecordByID(id);

    // Quick-Rate Answers
    const {
      technologyAns = null,
      modernizationAns = null,
      balconyAns = null,
      gardenAns = null,
      kitchenAns = null,
      yearBuiltAns = null,
    } = (await this.flatsAnswerService.getOneRecordByID(id)) ?? {};

    /* PROPERTIES/PARAMETERS */
    const params = await rateParams(
      id,
      yearBuilt,
      material,
      buildingType,
      floorsNumber,
      description,
    );

    /* RATINGS & SUMMARIES */

    try {
      /* TECHNOLOGY */
      let technologyRating: { rating: number; summary: string } = {
        rating: -9,
        summary: '',
      };

      if (technologyAns === null) {
        technologyRating = await this.rateProperty(
          id,
          'technology',
          technologySummaryPrompt,
          technologyRatingPrompt,
          {
            year_built: yearBuiltAns
              ? String(yearBuiltAns)
              : params.yearBuilt
                ? String(params.yearBuilt)
                : String(yearBuilt),
            material: params.material,
            building_type: params.buildingType,
            number_of_floors: String(params.floorsNumber),
          },
        );
      } else {
        // Copy data from Answers DB to GPT DB (quick-rate)
        technologyRating.rating = technologyAns;
        technologyRating.summary = 'Oceniono przez użytkownika.';

        this.flatsGPTService.createOrUpdateGPTAnswer(id, 'ai', {
          flatID: id,
          technologyRating: technologyRating.rating,
          technologySummary: technologyRating.summary,
        });
      }
      /* LEGAL STATUS */
      const legalStatusRating = await this.rateProperty(
        id,
        'legalStatus',
        legalStatusSummaryPrompt,
        legalStatusRatingPrompt,
      );

      if (legalStatusRating.rating === -9) {
        if (legalStatus === 'Własność') {
          this.flatsGPTService.createOrUpdateGPTAnswer(id, 'ai', {
            flatID: id,
            legalStatusRating: 1,
            legalStatusSummary: 'Pobrano z parametrów nieruchomości',
          });
          if (legalStatus.toLowerCase().includes('spółdzielcze')) {
            this.flatsGPTService.createOrUpdateGPTAnswer(id, 'ai', {
              flatID: id,
              legalStatusRating: 2,
              legalStatusSummary: 'Pobrano z parametrów nieruchomości',
            });
          }
        }
      }

      /* GARDEN should be before the balcony, because when it's available then we treat that there is outside area attached to apartment */
      let gardenRating: { rating: number; summary: string } = {
        rating: -9,
        summary: '',
      };

      if (gardenAns === null) {
        gardenRating = await this.rateProperty(
          id,
          'garden',
          gardenSummaryPrompt,
          gardenRatingPrompt,
        );
      } else {
        // Copy data from Answers DB to GPT DB (quick-rate)

        gardenRating.rating = gardenAns;
        gardenRating.summary = 'Oceniono przez użytkownika.';

        this.flatsGPTService.createOrUpdateGPTAnswer(id, 'ai', {
          flatID: id,
          gardenRating: gardenRating.rating,
          gardenSummary: gardenRating.summary,
        });
      }

      if (gardenRating.rating !== 1) {
        /* Take answer from garden properties */
        const gardenAnswerFromProperties = this.simpleYesNoTranslate(garden);
        this.flatsGPTService.createOrUpdateGPTAnswer(id, 'ai', {
          flatID: id,
          gardenRating: gardenAnswerFromProperties === 'yes' ? 1 : 0,
          gardenSummary: 'Odczytano z parametrów nieruchomości',
        });
      }

      /* BALCONY */
      if (balconyAns === null) {
        await this.rateProperty(
          id,
          'balcony',
          balconySummaryPrompt,
          balconyRatingPrompt,
          {
            balcony_quantity: balconyQuantity
              ? String(balconyQuantity)
              : 'information not provided.',
            terraces_quantity: terracesQuantity
              ? String(terracesQuantity)
              : 'information not provided.',
            loggias_quantity: loggiasQuantity
              ? String(loggiasQuantity)
              : 'information not provided.',
            french_balcony_quantity: frenchBalconyQuantity
              ? String(frenchBalconyQuantity)
              : 'information not provided.',
          },
        );
      } else if (balconyAns !== null) {
        // Copy data from Answers DB to GPT DB (quick-rate)}
        this.flatsGPTService.createOrUpdateGPTAnswer(id, 'ai', {
          flatID: id,
          balconyRating: balconyAns,
          balconySummary: 'Oceniono przez użytkownika.',
        });
      } else {
        this.flatsGPTService.createOrUpdateGPTAnswer(id, 'ai', {
          flatID: id,
          balconyRating: 1,
          balconySummary: 'Mieszkanie posiada przynależny ogródek',
        });
      }

      /* ELEVATOR */
      await this.rateProperty(
        id,
        'elevator',
        elevatorSummaryPrompt,
        elevatorRatingPrompt,
        { number_of_floors: String(params.floorsNumber) },
      );

      /*  BASEMENT */
      const basementRating = await this.rateProperty(
        id,
        'basement',
        basementSummaryPrompt,
        basementRatingPrompt,
      );

      if (basementRating.rating === -9) {
        if (basement === 'Tak' || attic === 'Tak' || storageRoom === 'Tak') {
          this.flatsGPTService.createOrUpdateGPTAnswer(id, 'ai', {
            flatID: id,
            basementRating: 1,
            basementSummary: 'Pobrano z parametrów nieruchomości',
          });
          if (basement === 'Nie' || attic === 'Nie' || storageRoom === 'Nie') {
            this.flatsGPTService.createOrUpdateGPTAnswer(id, 'ai', {
              flatID: id,
              basementRating: 0,
              basementSummary: 'Pobrano z parametrów nieruchomości',
            });
          }
        }
      }

      /* GARAGE */
      await this.rateProperty(
        id,
        'garage',
        garageSummaryPrompt,
        garageRatingPrompt,
        {
          price_underground: priceParkingUnderground
            ? String(priceParkingUnderground)
            : 'information not provided.',
          price_ground: priceParkingGround
            ? String(priceParkingGround)
            : 'information not provided.',
        },
      );

      /* MONITORING */
      await this.rateProperty(
        id,
        'monitoring',
        monitoringSummaryPrompt,
        monitoringRatingPrompt,
        {
          security: this.simpleYesNoTranslate(security),
          guarded_area: this.simpleYesNoTranslate(guardedArea),
          guarded_estate: this.simpleYesNoTranslate(guardedEstate),
          security_control: this.simpleYesNoTranslate(securityControl),
        },
      );

      /* KITCHEN */
      let kitchenRating: { rating: number; summary: string } = {
        rating: -9,
        summary: '',
      };

      if (kitchenAns === null) {
        kitchenRating = await this.rateProperty(
          id,
          'kitchen',
          kitchenSummaryPrompt,
          kitchenRatingPrompt,
        );

        if (kitchenRating.rating === -9) {
          if (kitchenType === 'Ciemna' || kitchenType === 'Prześwit') {
            this.flatsGPTService.createOrUpdateGPTAnswer(id, 'ai', {
              flatID: id,
              kitchenRating: 1,
              kitchenSummary: 'Pobrano z parametrów nieruchomości',
            });
          }
          if (kitchenType === 'Widna') {
            this.flatsGPTService.createOrUpdateGPTAnswer(id, 'ai', {
              flatID: id,
              kitchenRating: 2,
              kitchenSummary: 'Pobrano z parametrów nieruchomości',
            });
          }
          if (kitchenType.includes('Aneks')) {
            this.flatsGPTService.createOrUpdateGPTAnswer(id, 'ai', {
              flatID: id,
              kitchenRating: 3,
              kitchenSummary: 'Pobrano z parametrów nieruchomości',
            });
          }
        }
      } else {
        // Copy data from Answers DB to GPT DB (quick-rate)
        kitchenRating.rating = kitchenAns;
        kitchenRating.summary = 'Oceniono przez użytkownika.';
        this.flatsGPTService.createOrUpdateGPTAnswer(id, 'ai', {
          flatID: id,
          kitchenRating: kitchenAns,
          kitchenSummary: 'Oceniono przez użytkownika.',
        });
      }
      /* RENT */
      let rentRating: { rating: number; summary: string } = {
        rating: -9,
        summary: '',
      };
      rentRating = await this.rateProperty(
        id,
        'rent',
        rentSummaryPrompt,
        rentRatingPrompt,
      );
      if (rentRating.rating === -9 && rent !== null) {
        this.flatsGPTService.createOrUpdateGPTAnswer(id, 'ai', {
          flatID: id,
          rentRating: rent,
          rentSummary: 'Pobrano z parametrów nieruchomości',
        });
      }

      /* OUTBUILDING */
      await this.rateProperty(
        id,
        'outbuilding',
        outbuildingSummaryPrompt,
        outbuildingRatingPrompt,
        {},
        {
          technology_rating: String(technologyRating.rating),
        },
      );

      /* MODERNIZATION */
      let modernizationRating: { rating: number; summary: string } = {
        rating: -9,
        summary: '',
      };

      if (modernizationAns === null) {
        modernizationRating = await this.rateProperty(
          id,
          'modernization',
          modernizationSummaryPrompt,
          modernizationRatingPrompt,
          {},
          {
            technology_rating: String(technologyRating.rating),
            year_of_built: String(params.yearBuilt),
          },
        );
      } else {
        // Copy data from Answers DB to GPT DB (quick-rate)
        modernizationRating.rating = modernizationAns;
        modernizationRating.summary = 'Oceniono przez użytkownika.';
        this.flatsGPTService.createOrUpdateGPTAnswer(id, 'ai', {
          flatID: id,
          modernizationRating: modernizationAns,
          modernizationSummary: 'Oceniono przez użytkownika.',
        });
      }
      /* Change status of the task */
      this.updateStatus(id, FlatsGPTStatus.COMPLETED);
    } catch (error) {
      this.updateStatus(id, FlatsGPTStatus.ERROR);
      this.logger.error(error.message, GptService.name);
    }
  }
}
