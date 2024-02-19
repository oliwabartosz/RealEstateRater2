import { Inject, Injectable } from '@nestjs/common';
import {
  FlatsAnswersService,
  FlatsGPTService,
  FlatsService,
} from 'src/flats/flats.service';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { translateDescriptionPrompt } from './prompts/flats/flats-prompts';
import { Request } from 'express';

@Injectable()
export class GptService {
  constructor(
    @Inject(FlatsService) private flatsService: FlatsService,
    @Inject(FlatsAnswersService)
    private flatsAnswerService: FlatsAnswersService,
    @Inject(FlatsGPTService) private flatsGPTService: FlatsGPTService,
  ) {}

  public async rateFlats(apiKey: string, request: Request ) {
  
    const model = new ChatOpenAI({ 
      modelName: process.env.OPENAI_MODEL,
      openAIApiKey: apiKey,
    });


    const promptTemplate = PromptTemplate.fromTemplate(
      translateDescriptionPrompt
    );

    // You can also create a chain using an array of runnables
    const chain = RunnableSequence.from([promptTemplate, model]);
    
    const id = (await this.flatsService.getOneRecord(1)).id;
    const description = (await this.flatsService.getOneRecord(1)).description;
    const result = await chain.invoke({ offerDescription: description});

    this.flatsGPTService.createOrUpdateGPTAnswer(flatID, )

    
    console.log(result.lc_kwargs.content);
    return result.lc_kwargs.content;

  }
}
