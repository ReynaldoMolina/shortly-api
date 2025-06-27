const express = require('express');

const urlsRouter = require('./urls.router');
const redirectRouter = require('./redirect.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/', router);

  router.use('/shorten', urlsRouter);
  router.use('/s', redirectRouter);
}

module.exports = routerApi;