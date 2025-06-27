const { UrlsSchema, Urls } = require('./urls.model');

function setupModels(sequelize) {
  Urls.init(UrlsSchema, Urls.config(sequelize));
}

module.exports = setupModels;