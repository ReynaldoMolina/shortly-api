const express = require('express');

const urlsRouter = require('./urls.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/', router);

  router.use('/shorten', urlsRouter);
}

module.exports = routerApi;