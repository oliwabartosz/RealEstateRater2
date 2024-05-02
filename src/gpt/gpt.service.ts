import { Inject, Injectable } from '@nestjs/common';
import {
  FlatsAnswersService,
  FlatsGPTService,
  FlatsService,
} from 'src/flats/flats.service';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import {
  RunnableSequence,
  RunnablePassthrough,
} from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';
import {
  rolePrompt,
  technologyRatingPrompt,
  technologySummaryPrompt,
  translateLemma,
} from './prompts/flats/flats-prompts';

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

  private initializeModel(apiKey: string) {
    return new ChatOpenAI({
      modelName: process.env.OPENAI_MODEL,
      openAIApiKey: apiKey,
    });
  }

  public async rateFeatures(apiKey: string, flatNumber: number) {
    const model = this.initializeModel(apiKey);

    const lemma: string = (await this.flatsService.getOneRecord(flatNumber))
      .technologyLemma;
    const material: string = (await this.flatsService.getOneRecord(flatNumber))
      .material;
    const yearBuilt: number = (await this.flatsService.getOneRecord(flatNumber))
      .yearBuilt;
    const buildingType: string = (
      await this.flatsService.getOneRecord(flatNumber)
    ).buildingType;
    const floorNumbersPlus1: number =
      (await this.flatsService.getOneRecord(flatNumber)).floorsNumber + 1;

    const expandedLemma: string = lemma.concat(
      material ? 'The building is made of ' + material : '',
      yearBuilt ? '. It was built in ' + yearBuilt : '',
      buildingType ? '. The type of building is: ' + buildingType : '',
      floorNumbersPlus1
        ? '. The building has ' + floorNumbersPlus1 + ' floors.'
        : '',
    );

    const promptLemmaTranslation = PromptTemplate.fromTemplate(translateLemma);

    const promptSummary = PromptTemplate.fromTemplate(
      rolePrompt + technologySummaryPrompt,
    );

    const promptRating = PromptTemplate.fromTemplate(technologyRatingPrompt);

    const translationChain = promptLemmaTranslation
      .pipe(model)
      .pipe(this.outputParser);
    const summaryChain = promptSummary.pipe(model).pipe(this.outputParser);
    const ratingChain = promptRating.pipe(model).pipe(this.outputParser);

    //   chain = (
    //     {"synopsis": synopsis_chain}
    //     | RunnablePassthrough.assign(review=review_chain)
    //     | RunnablePassthrough.assign(summary=summary_chain)
    // )

    const chain = RunnableSequence.from([
      {
        translatedLemma: translationChain,
      },
      new RunnablePassthrough(summary),
    ]);

    // const combinedChain = RunnableSequence.from([
    //   {
    //     translatedLemma: promptLemmaTranslation.pipe(model).pipe(this.outputParser),
    //     summary: promptTechnologySummary.pipe(model).pipe(this.outputParser),
    //   },
    //   promptTechnologyRating,
    //   model,
    //   this.outputParser
    // ]);

    const result = await chain.invoke({ offerLemma: expandedLemma });

    console.log(
      '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',
    );
    console.log(result);
  }
}
