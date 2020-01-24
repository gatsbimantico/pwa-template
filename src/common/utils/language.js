const languageByHostMap = {
  'localhost.co.uk': 'en-GB',
  'localhost.com': 'en-US',
  'localhost.me': 'en-US',
  'localhost.es': 'es-ES',
  'localhost': 'es-ES',
};

export const getLanguage = (hostname, params) => {
  return params.language || params.lang || params.lng || languageByHostMap[hostname];
}

export const fallbackLng = 'en-GB';

const readTranslation = (lng, ns, fs) => fs && JSON.parse(fs
  .readFileSync(`./src/common/translations/${lng}/${ns}.json`, 'utf8'));

export const getTranslations = (lang = 'en-GB', ns = 'main', fs) => {
  const translations = {
    [fallbackLng]: { [ns]: readTranslation(fallbackLng, 'main', fs) },
  };

  if (fallbackLng !== lang) {
    translations[lang] = { [ns]: readTranslation(lang, ns, fs) };
  }
};
