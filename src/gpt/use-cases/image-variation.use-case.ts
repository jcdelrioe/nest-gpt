import * as fs from 'fs';
import { Options } from '@nestjs/common';
import OpenAI from 'openai';
import { downloadImageAsPng } from 'src/helpers';
import { url } from 'inspector';

interface Options {
  baseImage: string;
}

export const imageVariationUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { baseImage } = options;

  const pngImagePath = await downloadImageAsPng(baseImage, true);

  const response = await openai.images.createVariation({
    model: 'dall-e-2',
    image: fs.createReadStream(pngImagePath),
    n: 1,
    size: '1024x1024',
    response_format: 'url',
  });

  const fileName = await downloadImageAsPng(response.data[0].url ?? '');
  const url = `${process.env.SERVER_URL}/gpt/image-generated/${fileName}`;

  return {
    url: url,
    openAIUrl: response.data[0].url,
    revised_prompt: response.data[0].revised_prompt,
  };

  return baseImage;
};
