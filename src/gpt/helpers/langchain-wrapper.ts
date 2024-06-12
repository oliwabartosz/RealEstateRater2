import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatOpenAI } from '@langchain/openai';
import { RunnableSequence } from '@langchain/core/runnables';

/* TYPES */
export type Models =
  | 'gpt-3.5-turbo'
  | 'gpt-4'
  | 'gpt-4-turbo-preview'
  | 'gpt-4o';

export type LangchainVariables =
  | { offerLemma: string }
  | { lemma: string }
  | { summary: string }
  | { text: string }
  | { real_estate_offer: string }
  | { year_built: string }
  | { material: string }
  | { building_type: string }
  | { number_of_floors: string };

const parser = new StringOutputParser();
const openAIApiKey = process.env.OPENAI_API_KEY;

function chooseModelToCreate(modelName: Models, creativity: number) {
  return createChatOpenAI(modelName, creativity);
}

function createChatOpenAI(modelName: Models, creativity: number): ChatOpenAI {
  return new ChatOpenAI({
    modelName,
    openAIApiKey,
    temperature: creativity,
  });
}

export async function generateChainAndInvoke(
  promptTemplate: string,
  modelName: Models,
  creativity: number,
  data: LangchainVariables,
) {
  const prompt = PromptTemplate.fromTemplate(promptTemplate);

  const chain = prompt
    .pipe(chooseModelToCreate(modelName, creativity))
    .pipe(parser);

  return await chain.invoke(data);
}

export async function generateChainsAndInvokeSummaryAndRating(
  promptSummary: string,
  promptRating: string,
  modelName: Models,
  creativity: number,
  lemma: string,
) {
  const promptS = PromptTemplate.fromTemplate(promptSummary);
  const promptR = PromptTemplate.fromTemplate(promptRating);
  const model = chooseModelToCreate(modelName, creativity);

  const chain = promptS.pipe(model).pipe(parser);

  const combinedChain = RunnableSequence.from([
    {
      summary: chain,
    },
    promptR,
    model,
    parser,
  ]);

  const result = await combinedChain.invoke({
    lemma,
  });

  return result;
}

export function generateChain(
  promptTemplate: string,
  modelName: Models,
  creativity: number,
) {
  const prompt = PromptTemplate.fromTemplate(promptTemplate);

  const chain = prompt
    .pipe(chooseModelToCreate(modelName, creativity))
    .pipe(parser);

  return chain;
}
