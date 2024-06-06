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
  elevatorSummaryPrompt,
  gardenSummaryPrompt,
  legalStatusSummaryPrompt,
  technologySummaryPrompt,
} from './prompts/flats/summaries';
import {
  balconyRatingPrompt,
  elevatorRatingPrompt,
  gardenRatingPrompt,
  legalStatusRatingPrompt,
  technologyRatingPrompt,
} from './prompts/flats/ratings';
import {
  translateFromENtoPL,
  translateFromPLtoEN,
} from './prompts/flats/translation';
import { rateParams } from './helpers/params.rating';

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

  private async rateProperty(
    id: string,
    property: keyof FlatsData,
    promptSummary: string,
    promptRating: string,
    flatsDataInstance: FlatsData,
  ) {
    let summary = '';
    let rating = '';

    const propertyLemma =
      flatsDataInstance[`${property}Lemma` as keyof FlatsData];
    const user = undefined;

    if (typeof property !== 'number') {
      if (propertyLemma !== '') {
        const lemma = await this.translateWithGPT(FlatsData[property], 'pl_en');

        summary = await generateChainAndInvoke(
          promptSummary,
          this.modelName,
          this.creativity,
          { lemma },
        );

        rating = await generateChainAndInvoke(
          promptRating,
          this.modelName,
          this.creativity,
          { summary },
        );

        await this.flatsGPTService.createOrUpdateGPTAnswer(id, user, {
          flatID: id,
          [`${property}Rating`]: Number(rating) || -9,
          [`${property}Summary`]: this.translateWithGPT(summary, 'en_pl'),
        });
      }
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

    // Fields taken from the QuickRate
    const {
      technologyAns,
      modernizationAns,
      kitchenAns,
      balconyAns,
      gardenAns,
      qualityAns,
      deleteAns,
    } = await this.flatsAnswerService.getOneRecordByID(id);

    // Basic data from scraped
    const {
      description,
      technologyLemma,
      modernizationLemma,
      kitchenLemma,
      balconyLemma,
      gardenLemma,
      basementLemma,
      rentLemma,
      legalStatusLemma,
      garageLemma,
      streetLemma,
      elevatorLemma,
      monitoringLemma,
      outbuildingLemma,
      yearBuilt,
      material,
      buildingType,
      floorsNumber,
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
    let technologyRating;

    /* TECHNOLOGY */
    if (typeof technologyAns !== 'number') {
      if (technologyLemma !== '') {
        const lemma = await this.translateWithGPT(
          flatsData.technologyLemma,
          'pl_en',
        );

        const technologySummary = await generateChainAndInvoke(
          technologySummaryPrompt,
          this.modelName,
          this.creativity,
          {
            lemma,
            year_built: String(params.yearBuilt),
            material: params.material,
            building_type: params.buildingType,
            number_of_floors: String(params.floorsNumber),
          },
        );

        technologyRating = await generateChainAndInvoke(
          technologyRatingPrompt,
          this.modelName,
          this.creativity,
          {
            summary: technologySummary,
          },
        );

        if (!Number.isNaN(Number(technologyRating))) {
          this.flatsGPTService.createOrUpdateGPTAnswer(id, 'ai', {
            flatID: id,
            technologyGPT: technologyRating,
          });
        }

        if (technologySummary !== '') {
          this.flatsGPTService.createOrUpdateGPTAnswer(id, 'ai', {
            flatID: id,
            technologySummary,
          });
        }
      }
    }

    /* LEGAL STATUS */
    await this.rateProperty(
      id,
      'legalStatus',
      legalStatusSummaryPrompt,
      legalStatusRatingPrompt,
      flatsData,
    );

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
      );
    }

    /* ELEVATOR If in below text there is no information about the quantity of floors, take this additional information: The number of building floors is {number_of_floors}.
     */
    await this.rateProperty(
      id,
      'elevator',
      elevatorSummaryPrompt,
      elevatorRatingPrompt,
      flatsData,
    );

    /* Modernization  - technology rating is 2 or 3, please return null.
    The technology of building was rated as: {technology_rating}, and the building was built in {year_of_built}
    */

    /* OUTBUILDING The technology of building was rated as: {technology_rating}. */
  }
}
