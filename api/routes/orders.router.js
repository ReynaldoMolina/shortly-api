//create app with express
const express = require('express');
const passport = require('passport');
const OrdersService = require('../services/orders.service')
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const { createOrderSchema, updateOrderSchema, getOrderSchema, queryOrderSchema } = require('../schemas/orders.schema');

const router = express.Router();
const service = new OrdersService();

//get all registers
router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(queryOrderSchema, 'query'),
  async (req, res, next) => {
    try {
      const orders = await service.find(req.query);
      res.json(orders);
    } catch (error) {
      next(error)
    }
  }
);

//get url parameters - get one register
router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

//create register
router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

//update register (some data)
router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const body = req.body;
      const order = await service.update(id, body);
      res.json(order);
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
      const order = await service.delete(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
});

module.exports = router;