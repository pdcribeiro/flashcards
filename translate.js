const TRANSLATE_URL =
  'https://translation.googleapis.com/language/translate/v2';
const ITALIAN = 'it';
const PORTUGUESE = 'pt';

export default async function ({ apiKey }, textList) {
  console.log('translate()');
  const response = await http.postJson({
    url: TRANSLATE_URL,
    query: {
      q: textList,
      source: ITALIAN,
      target: PORTUGUESE,
      key: apiKey,
    },
  });
  // return response.data.translations.map(t => t.translatedText.toLowerCase())
  return response.data.translations[0].translatedText.toLowerCase().split(', ');
}
