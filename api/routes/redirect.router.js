const express = require('express');
const UrlsService = require('../services/urls.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getUrlSchema } = require('../schemas/urls.schema');

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

module.exports = router;