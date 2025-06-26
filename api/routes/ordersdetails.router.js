//create app with express
const express = require('express');
const passport = require('passport');
const OrdersDetailsService = require('../services/ordersdetails.service')
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const { createOrderDetailSchema, updateOrderDetailSchema, getOrderDetailSchema } = require('../schemas/ordersdetails.schema');

const router = express.Router();
const service = new OrdersDetailsService();

//get all registers
router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const ordersDetails = await service.find();
      res.json(ordersDetails);
    } catch (error) {
      next(error);
    }
});


//get url parameters - get one register
router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getOrderDetailSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const orderDetails = await service.findOrder(id);
      res.json(orderDetails);
    } catch (error) {
      next(error);
    }
  }
);

//create register
router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(createOrderDetailSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrderDetail = await service.create(body);
      res.status(201).json(newOrderDetail);
    } catch (error) {
      next(error);
    }
  }
);

//update register (some data)
router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getOrderDetailSchema, 'params'),
  validatorHandler(updateOrderDetailSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const body = req.body;
      const orderDetails = await service.update(id, body);
      res.json(orderDetails);
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
      const orderDetails = await service.delete(id);
      res.json(orderDetails);
    } catch (error) {
      next(error);
    }
});

module.exports = router;