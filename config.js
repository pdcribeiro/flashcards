const DEFAULTS = {
  db: {
    authUrl: '',
    apiKey: '',
    baseUrl: '',
  },
  ai: {
    apiKey: '',
  },
  user: {
    id: '',
  },
  google: {
    apiKey: '',
  },
};
const KEY = 'config';

export default {
  load() {
    this.migrate();
    const config = getConfigFromUrl();
    if (config) {
      this.set(config);
      redirectToRoot();
      return config;
    } else {
      const json = localStorage.getItem(KEY);
      return json ? JSON.parse(json) : DEFAULTS;
    }
  },
  save(value) {
    const json = JSON.stringify(value);
    localStorage.setItem(KEY, json);
  },
  share() {
    const json = localStorage.getItem(KEY);
    const param = encodeURIComponent(json);
    const baseUrl = window.location.href.split('?')[0];
    const url = `${baseUrl}?${KEY}=${param}`;
    navigator.clipboard.writeText(url);
  },
  migrate() {
    const OLD_KEY = 'settings';
    const NEW_KEY = 'config';
    if (!localStorage.getItem(NEW_KEY)) {
      const config = localStorage.getItem(OLD_KEY);
      localStorage.setItem(NEW_KEY, config);
    }
  },
};

function getConfigFromUrl() {
  const param = new URLSearchParams(window.location.search).get(KEY);
  if (param) {
    const json = decodeURIComponent(param);
    const config = JSON.parse(json);
    return config;
  } else {
    return null;
  }
}

function redirectToRoot() {
  const baseUrl = window.location.href.split('?')[0];
  history.replaceState({}, '', baseUrl);
}
