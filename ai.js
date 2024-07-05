const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const DEV_RESPONSE = {
  pairs: {
    ciao: 'olá',
    ragazza: 'menina',
    ragazzo: 'rapaz',
    casa: 'casa',
    libro: 'livro',
    mela: 'maçã',
    gatto: 'gato',
    cane: 'cão',
    mare: 'mar',
    scuola: 'escola',
  },
};

export default {
  async generate({ apiKey }, { exclude, prompt }) {
    const answer = await chat(apiKey, [
      {
        role: 'system',
        content: getSystemMessage(exclude),
      },
      {
        role: 'user',
        content: prompt,
      },
    ]);
    return answer.pairs;
  },
};

async function chat(apiKey, messages) {
  console.log('ai.chat()', { messages });
  if (!apiKey) {
    throw new Error('Missing AI API key');
  }

  // return DEV_RESPONSE; // DEV
  const response = await http.postJson({
    url: OPENAI_API_URL,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: {
      model: 'gpt-3.5-turbo-0125',
      response_format: { type: 'json_object' },
      messages,
    },
  });

  const answer = JSON.parse(response.choices[0].message.content);
  console.log({ answer });
  return answer;
}

function getSystemMessage(exclude) {
  return `You are a helpful assistant designed to generate word pairs in italian and portuguese (Portugal portuguese).

    Exclude the following italian words: ${exclude}.

    You should output JSON: { "pairs": { <it_1>: <pt_1>, <it_2>: <pt_2>, ... } }.
  `;
}
