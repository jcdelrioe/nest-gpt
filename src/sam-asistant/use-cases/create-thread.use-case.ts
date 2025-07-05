import OpenAI from 'openai';

export const createThreadUsecase = async (openai: OpenAI) => {
  const { id } = await openai.beta.threads.create();

  return { id };
};
