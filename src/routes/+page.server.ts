import { OPENAI_API_TOKEN } from '$env/static/private';

import OpenAI from 'openai';

const DOG_API = 'https://dog.ceo/api/breeds/image/random' as const satisfies string;

const openai = new OpenAI({
	apiKey: OPENAI_API_TOKEN
});

export const load = async ({ fetch }) => {
	const dogApiRes = await fetch(DOG_API);
	const { message } = (await dogApiRes.json()) as { message: string; status: string };

	const openaiResponse = openai.chat.completions.create({
		model: 'gpt-4-vision-preview',
		max_tokens: 300,
		messages: [
			{
				role: 'user',
				content: [
					{
						type: 'text',
						text: 'この犬についてどう思いますか？'
					},
					{
						type: 'image_url',
						image_url: { url: message }
					}
				]
			}
		]
	});

	return {
		dogURL: message,
		stream: {
			openaiResponse
		}
	};
};
