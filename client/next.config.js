const nextTranslate = require('next-translate');
const { locales, defaultLocale } = require('./i18n.json');
const imagesUrl = process.env.IMAGES_URL.split(',');
//const withImages = require('next-images')

module.exports = {
  i18n: { locales, defaultLocale, localeDetection: false },
 // ...withImages(),
  // images: {   
  //   domains: imagesUrl,
  // },
  env: {
    API_URL: process.env.API_URL,
  },
  ...nextTranslate()
}