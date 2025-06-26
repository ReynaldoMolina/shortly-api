//create app with express
const express = require('express');
const passport = require('passport');
const SalesService = require('../services/sales.service')
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const { createSaleSchema, updateSaleSchema, getSaleSchema, querySalesSchema } = require('../schemas/sales.schema');

const router = express.Router();
const service = new SalesService();

//get all registers
router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(querySalesSchema, 'query'),
  async (req, res, next) => {
    try {
      const sales = await service.find(req.query);
      res.json(sales);
    } catch (error) {
      next(error)
    }
  }
);

//get url parameters - get one register
router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getSaleSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const sale = await service.findOne(id);
      res.json(sale);
    } catch (error) {
      next(error);
    }
  }
);

//create register
router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(createSaleSchema, 'body'),
  async (req, res) => {
    try {
      const body = req.body;
      const newSale = await service.create(body);
      res.status(201).json(newSale);
    } catch (error) {
      next(error);
    }
  }
);

//update register (some data)
router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getSaleSchema, 'params'),
  validatorHandler(updateSaleSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const body = req.body;
      const sale = await service.update(id, body);
      res.json(sale);
    } catch (error) {
      next(error);
    }
  }
);

//delete register
router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const sale = await service.delete(id);
      res.json(sale);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;