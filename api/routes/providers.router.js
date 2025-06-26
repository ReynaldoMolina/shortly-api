//create app with express
const express = require('express');
const passport = require('passport');
const ProvidersService = require('../services/providers.service')
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const { createProviderSchema, updateProviderSchema, getProviderSchema } = require('../schemas/providers.schema');

const router = express.Router();
const service = new ProvidersService();

//get all registers
router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const providers = await service.find();
      res.json(providers);
    } catch (error) {
      next(error);
    }
});

//get url parameters - get one register
router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getProviderSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const provider = await service.findOne(id);
      res.json(provider);
    } catch (error) {
      next(error);
    }
  }
);

//create register
router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(createProviderSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProvider = await service.create(body);
    res.status(201).json(newProvider);
  }
);

//update register (some data)
router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getProviderSchema, 'params'),
  validatorHandler(updateProviderSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const body = req.body;
      const provider = await service.update(id, body);
      res.json(provider);
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
      const provider = await service.delete(id);
      res.json(provider);
    } catch (error) {
      next(error);
    }
});

module.exports = router;