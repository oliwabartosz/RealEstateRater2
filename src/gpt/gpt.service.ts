import { Inject, Injectable } from '@nestjs/common';
import {
  FlatsAnswersService,
  FlatsGPTService,
  FlatsService,
} from 'src/flats/flats.service';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { StringOutputParser } from "@langchain/core/output_parsers";
import { technologySummaryPrompt, translateDescriptionPrompt, translateLemma } from './prompts/flats/flats-prompts';


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

  public async translateLemmatization(apiKey: string, flatNumber: number, flatFeatureLemma: string) {

    const model = this.initializeModel(apiKey);


    const promptTemplate = PromptTemplate.fromTemplate(
      translateLemma
    );

    // You can also create a chain using an array of runnables
    const chain = RunnableSequence.from([promptTemplate, model, this.outputParser]);
    
    const id: string = (await this.flatsService.getOneRecord(flatNumber)).id;
    const lemma: string = (await this.flatsService.getOneRecord(flatNumber))[flatFeatureLemma];
    const result: string = await chain.invoke({ offerLemma: lemma});

    return result;


  }

  public async rateFeatures(apiKey: string, flatNumber: number, translatedLemma: string) {
    
    const model = this.initializeModel(apiKey);

    const material = (await this.flatsService.getOneRecord(flatNumber)).material;
    const yearBuilt = (await this.flatsService.getOneRecord(flatNumber)).yearBuilt;
    const buildingType = (await this.flatsService.getOneRecord(flatNumber)).buildingType;
    const floorNumbersPlus1 = (await this.flatsService.getOneRecord(flatNumber)).floorsNumber + 1;

    translatedLemma = translatedLemma.concat("The building is made of " + material + " and was built in " + yearBuilt + ". It is a " + buildingType + " with " + floorNumbersPlus1 + " floors.");
    
    const promptTemplate = PromptTemplate.fromTemplate(
      technologySummaryPrompt
    );

    const chain = RunnableSequence.from([promptTemplate, model, out]);

    const result = await chain.invoke({ offerDescription: translatedLemma});
    
    
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    console.log(translatedLemma)
    console.log(result)

  
    

  }
}
