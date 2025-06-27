const express = require('express');

const urlsRouter = require('./urls.router');
const redirectRouter = require('./redirect.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api', router);

  router.use('/shorten', urlsRouter);
  router.use('/', redirectRouter);
}

module.exports = routerApi;