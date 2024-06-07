import { Inject, Injectable } from '@nestjs/common';
import {
  FlatsAnswersService,
  FlatsGPTService,
  FlatsService,
} from 'src/flats/flats.service';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { LoggerService } from 'src/logger/logger.service';
import { FlatsGPTStatus } from 'src/interfaces/flat-gpt-record';
import { FlatsGPT } from 'src/flats/entities/flats-gpt.entity';
import { Models, generateChainAndInvoke } from './helpers/langchain-wrapper';
import { FlatsAnswers } from 'src/flats/entities/flats-answers.entity';
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
  translateFromENtoPL,
  translateFromPLtoEN,
} from './prompts/flats/translation';
import { rateParams } from './helpers/params.rating';

type FlatsDataKeys =
  | keyof FlatsData
  | 'technology'
  | 'garage'
  | 'modernization'
  | 'outbuilding'
  | 'kitchen';

@Injectable()
export class GptService {
  private outputParser: StringOutputParser;

  constructor(
    @Inject(FlatsService) private flatsService: FlatsService,
    @Inject(FlatsAnswersService)
    private flatsAnswerService: FlatsAnswersService,
    @Inject(FlatsGPTService) private flatsGPTService: FlatsGPTService,
  ) {
    this.outputParser = new StringOutputParser();
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
        dictionary = translateFromENtoPL;
        break;
      case 'pl_en':
        dictionary = translateFromPLtoEN;
        break;
    }

    return await generateChainAndInvoke(
      dictionary,
      this.translationModelName,
      this.creativity,
      { text },
    );
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
    flatsDataInstance: FlatsData,
    summaryParams?: { [key: string]: string },
    ratingParams?: { [key: string]: string },
  ) {
    let summary = '';
    let rating = '';

    const propertyLemma =
      flatsDataInstance[`${property}Lemma` as keyof FlatsDataKeys];
    const user = undefined;

    if (typeof property !== 'number' && propertyLemma !== '') {
      const lemma = await this.translateWithGPT(FlatsData[property], 'pl_en');

      summary = await generateChainAndInvoke(
        promptSummary,
        this.modelName,
        this.creativity,
        { lemma, ...summaryParams },
      );

      rating = await generateChainAndInvoke(
        promptRating,
        this.modelName,
        this.creativity,
        { summary, ...ratingParams },
      );

      await this.flatsGPTService.createOrUpdateGPTAnswer(id, user, {
        flatID: id,
        [`${property}Rating`]: Number(rating) || -9,
        [`${property}Summary`]: this.translateWithGPT(summary, 'en_pl'),
      });
    }
    return {
      rating: Number(rating) || -9,
      summary: summary,
    };
  }

  async rateFlatOffer(
    id: string,
    flatGPT: FlatsGPT,
    flatAnswer: FlatsAnswers,
    flatsData: FlatsData,
  ) {
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
      priceParkingUnderground,
      priceParkingGround,
      security,
      guardedArea,
      guardedEstate,
      securityControl,
      kitchenType,
    } = await this.flatsService.getOneRecordByID(id);

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

    /* TECHNOLOGY */
    const technologyRating = await this.rateProperty(
      id,
      'technology',
      technologySummaryPrompt,
      technologyRatingPrompt,
      flatsData,
      {
        year_built: String(params.yearBuilt),
        material: params.material,
        building_type: params.buildingType,
        number_of_floors: String(params.floorsNumber),
      },
    );

    /* LEGAL STATUS */
    const legalStatusRating = await this.rateProperty(
      id,
      'legalStatus',
      legalStatusSummaryPrompt,
      legalStatusRatingPrompt,
      flatsData,
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
    const gardenRating = await this.rateProperty(
      id,
      'garden',
      gardenSummaryPrompt,
      gardenRatingPrompt,
      flatsData,
    );

    if (gardenRating.rating !== 1) {
      /* BALCONY */
      await this.rateProperty(
        id,
        'balcony',
        balconySummaryPrompt,
        balconyRatingPrompt,
        flatsData,
        {
          balcony_quantity:
            String(balconyQuantity) || 'information not provided.',
          terraces_quantity:
            String(terracesQuantity) || 'information not provided.',
          loggias_quantity:
            String(loggiasQuantity) || 'information not provided.',
          french_balcony_quantity:
            String(frenchBalconyQuantity) || 'information not provided.',
        },
      );
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
      flatsData,
      { number_of_floors: String(params.floorsNumber) },
    );

    /*  BASEMENT */
    const basementRating = await this.rateProperty(
      id,
      'basement',
      basementSummaryPrompt,
      basementRatingPrompt,
      flatsData,
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
      flatsData,
      {
        price_underground:
          String(priceParkingUnderground) || 'information not provided.',
        price_ground: String(priceParkingGround) || 'information not provided.',
      },
    );

    /* MONITORING */
    await this.rateProperty(
      id,
      'monitoring',
      monitoringSummaryPrompt,
      monitoringRatingPrompt,
      flatsData,
      {
        security: this.simpleYesNoTranslate(security),
        guarded_area: this.simpleYesNoTranslate(guardedArea),
        guarded_estate: this.simpleYesNoTranslate(guardedEstate),
        security_control: this.simpleYesNoTranslate(securityControl),
      },
    );

    /* KITCHEN */
    const kitchenRating = await this.rateProperty(
      id,
      'kitchen',
      kitchenSummaryPrompt,
      kitchenRatingPrompt,
      flatsData,
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

    /* RENT */
    await this.rateProperty(
      id,
      'rent',
      rentSummaryPrompt,
      rentRatingPrompt,
      flatsData,
    );

    /* OUTBUILDING */
    await this.rateProperty(
      id,
      'outbuilding',
      outbuildingSummaryPrompt,
      outbuildingRatingPrompt,
      flatsData,
      {},
      {
        technology_rating: String(technologyRating.rating),
      },
    );

    /* MODERNIZATION */
    await this.rateProperty(
      id,
      'modernization',
      modernizationSummaryPrompt,
      modernizationRatingPrompt,
      flatsData,
      {},
      {
        technology_rating: String(technologyRating.rating),
        year_of_built: String(params.yearBuilt),
      },
    );
  }
}
