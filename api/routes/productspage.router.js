//create app with express
const express = require('express');
const passport = require('passport');
const ProductsPageService = require('../services/productspage.service')
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const { createProductPageSchema, updateProductPageSchema, getProductPageSchema } = require('../schemas/productspage.schema');

const router = express.Router();
const service = new ProductsPageService();

//get all registers
router.get('/', async (req, res) => {
    const productspage = await service.find();
    res.json(productspage);
  }
);

//get url parameters - get one register
router.get('/:id',
  validatorHandler(getProductPageSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const productpage = await service.findOne(id);
      res.json(productpage);
    } catch (error) {
      next(error);
    }
  }
);

//create register
router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(createProductPageSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProductPage = await service.create(body);
      res.status(201).json(newProductPage);
    } catch (error) {
      next(error);
    }
  }
);

//update register (some data)
router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getProductPageSchema, 'params'),
  validatorHandler(updateProductPageSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const body = req.body;
      const productpage = await service.update(id, body);
      res.json(productpage);
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
      const productpage = await service.delete(id);
      res.json(productpage);
    } catch (error) {
      next(error);
    }
});

module.exports = router;