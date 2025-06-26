//create app with express
const express = require('express');
const PurchasesDetailsService = require('../services/purchasesdetails.service')
const validatorHandler = require('../middlewares/validator.handler');
const { createPurchaseDetailSchema, updatePurchaseDetailSchema, getPurchaseDetailSchema } = require('../schemas/purchasesdetails.schema');

const router = express.Router();
const service = new PurchasesDetailsService();

//get all registers
router.get('/', async (req, res) => {
  const purchasesDetails = await service.find();
  res.json(purchasesDetails);
});

//register filter
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

//get url parameters - get one register
router.get('/:id',
  validatorHandler(getPurchaseDetailSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const purchaseDetails = await service.findPurchase(id);
      res.json(purchaseDetails);
    } catch (error) {
      next(error);
    }
  }
);

//create register
router.post('/',
  validatorHandler(createPurchaseDetailSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newPurchaseDetail = await service.create(body);
    res.status(201).json(newPurchaseDetail);
  }
);

//update register (some data)
router.patch('/:id',
  validatorHandler(getPurchaseDetailSchema, 'params'),
  validatorHandler(updatePurchaseDetailSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const body = req.body;
      const purchaseDetails = await service.update(id, body);
      res.json(purchaseDetails);
    } catch (error) {
      next(error);
    }
  }
);

//delete register
router.delete('/:id', async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const purchaseDetails = await service.delete(id);
      res.json(purchaseDetails);
    } catch (error) {
      next(error);
    }
});

module.exports = router;