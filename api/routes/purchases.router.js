//create app with express
const express = require('express');
const PurchasesService = require('../services/purchases.service')
const validatorHandler = require('../middlewares/validator.handler');
const { createPurchaseSchema, updatePurchaseSchema, getPurchaseSchema } = require('../schemas/purchases.schema');

const router = express.Router();
const service = new PurchasesService();

//get all registers
router.get('/', async (req, res) => {
    const purchases = await service.find();
    res.json(purchases);
});

//register filter
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

//get url parameters - get one register
router.get('/:id',
  validatorHandler(getPurchaseSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const purchase = await service.findOne(id);
      res.json(purchase);
    } catch (error) {
      next(error);
    }
  }
);

//create register
router.post('/',
  validatorHandler(createPurchaseSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newPurchase = await service.create(body);
    res.status(201).json(newPurchase);
  }
);

//update register (some data)
router.patch('/:id',
  validatorHandler(getPurchaseSchema, 'params'),
  validatorHandler(updatePurchaseSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const body = req.body;
      const purchase = await service.update(id, body);
      res.json(purchase);
    } catch (error) {
      next(error);
    }
  }
);

//delete register
router.delete('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const purchase = await service.delete(id);
        res.json(purchase);
    } catch (error) {
        next(error);
    }
});

module.exports = router;