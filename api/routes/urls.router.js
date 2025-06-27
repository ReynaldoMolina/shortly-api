const express = require('express');
const UrlsService = require('../services/urls.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkApiKey } = require('../middlewares/auth.handler');
const { createUrlSchema, getUrlSchema } = require('../schemas/urls.schema');
const { config } = require('../config/config');
const normalizeUrl = require('normalize-url').default;

const router = express.Router();
const service = new UrlsService();

router.get('/:id',
  validatorHandler(getUrlSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const { url: fullUrl } = await service.getById(id);
      return res.redirect(301, fullUrl);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  checkApiKey,
  validatorHandler(createUrlSchema, 'body'),
  async (req, res, next) => {
    let { url } = req.body;

    url = normalizeUrl(url, { defaultProtocol: 'https:' });

    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return res.status(400).json({ error: 'Only http/https are allowed' });
    }

    try {
      const newUrl = await service.create(url);
      res.status(201).json({
        shortUrl: `${config.baseUrl}/${newUrl.id}`,
        fullUrl: newUrl.url
      });
    } catch (error) {
      if (error.code === '23505') {
        return res.status(503).json({ error: 'Please retry' });
      }
      next(error);
    }
  }
);

module.exports = router;