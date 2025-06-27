const express = require('express');
const UrlsService = require('../services/urls.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkApiKey } = require('../middlewares/auth.handler');
const { createUrlSchema } = require('../schemas/urls.schema');
const { config } = require('../config/config');

const router = express.Router();
const service = new UrlsService();

router.post('/',
  checkApiKey,
  validatorHandler(createUrlSchema, 'body'),
  async (req, res, next) => {
    let { url } = req.body;

    if (!/^[a-zA-Z][\w+.-]*:\/\//.test(url)) {
      url = `https://${url}`;
    }

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
      const { row, created } = await service.findOrCreate(url);
      
      return res.status(created ? 201 : 200).json({
        shortUrl: `${config.baseUrl}/${row.id}`,
        fullUrl:  row.url,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;