//create app with express
const express = require('express');
const passport = require('passport');
const ProductsService = require('../services/products.service')
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('../schemas/products.schema');

const router = express.Router();
const service = new ProductsService();

//get all registers
router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

//get url parameters - get one register
router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

//create register
router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

//update register (some data)
router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
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
      const product = await service.delete(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
});

module.exports = router;