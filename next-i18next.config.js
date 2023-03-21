const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    localeDetection: false,
    locales: ['en', 'es'],
  },
  localePath: path.resolve('./src/i18n/locales'),
};
