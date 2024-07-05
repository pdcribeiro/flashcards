import http from './http.js';

let accessToken, baseUrl;

export default {
  async connect({ authUrl, apiKey, ...config }) {
    if (!authUrl) {
      throw new Error('Missing DB auth URL');
    }
    if (!apiKey) {
      throw new Error('Missing DB API key');
    }
    if (!config.baseUrl) {
      throw new Error('Missing DB base URL');
    }
    accessToken = await fetchAccessToken(authUrl, apiKey);
    baseUrl = config.baseUrl;
    // await migrate();
  },
  cards: {
    async list(filter = {}) {
      const { documents } = await req('cards', 'find', { filter });
      return documents;
    },
    async add(documents) {
      await req('cards', 'insertMany', { documents });
    },
    async move(it, pile) {
      await req('cards', 'updateOne', {
        filter: { it },
        update: { $set: { pile } },
      });
    },
  },
};

async function fetchAccessToken(url, key) {
  console.log('db.fetchAccessToken()');
  const response = await http.postJson({
    url,
    body: { key },
  });
  return response.access_token;
}

async function migrate() {
  console.log('db.migrate()');
  const response = await req('cards', 'updateMany', {
    filter: {},
    update: {
      $set: {
        userId: 'diogo',
      },
      $unset: {
        user_id: '',
      },
    },
  });
  console.log({ response });
}

async function req(collection, action, body) {
  console.log('db.req()', { body });
  if (!accessToken) {
    throw new Error('Please authenticate before calling the DB');
  }
  const response = await http.postJson({
    url: `${baseUrl}/action/${action}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: {
      ...body,
      dataSource: 'Cluster0',
      database: 'flashcards',
      collection,
    },
  });
  return response;
}
