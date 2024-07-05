export default {
  async postJson({ url, query, headers, body }) {
    console.log('postJson()');
    let fullUrl = url;
    if (query) {
      fullUrl +=
        '?' +
        Object.entries(query)
          .map((param) => param.join('='))
          .join('&');
    }
    const response = await fetch(fullUrl, {
      method: 'post',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    console.log({ json });
    return json;
  },
};
