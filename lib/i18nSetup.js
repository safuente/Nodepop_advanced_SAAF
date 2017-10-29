const i18n = require('i18n');
const path = require('path');

// registrar lenguajes
i18n.configure({
  directory: path.join(__dirname, '..', 'locales'),
  locales: ['en', 'es'],
  defaultLocale: 'en',
  syncFiles: true,
  register: global,
  queryParameter: 'lang',
  register: global,
  cookie: 'nodepop-lang'
});

module.exports = i18n;