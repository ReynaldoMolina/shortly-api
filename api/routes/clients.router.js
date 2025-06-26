//create app with express
const express = require('express');
const passport = require('passport');
const ClientsService = require('./../services/clients.service')
const validatorHandler = require('./../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const { createClientSchema, updateClientSchema, getClientSchema } = require('./../schemas/clients.schema');

const router = express.Router();
const service = new ClientsService();

// get all registers
router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const clients = await service.find();
      res.json(clients);
    } catch (error) {
      next(error);
    }
});

//get url parameters - get one register
router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getClientSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const client = await service.findOne(id);
      res.json(client);
    } catch (error) {
      next(error);
    }
  }
);

//create register
router.post('/',
  passport.authenticate('jwt', {session: false}), // check if logged in
  checkRoles('admin'), //allow this roles to create registers
  validatorHandler(createClientSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newClient = await service.create(body);
      res.status(201).json(newClient);
    } catch (error) {
      next(error);
    }
  }
);

//update register (some data)
router.patch('/:id',
  passport.authenticate('jwt', {session: false}), // check if logged in
  checkRoles('admin'), //allow this roles to update registers
  validatorHandler(getClientSchema, 'params'),
  validatorHandler(updateClientSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const body = req.body;
      const client = await service.update(id, body);
      res.json(client);
    } catch (error) {
      next(error);
    }
  }
);

//delete register
router.delete('/:id',
  passport.authenticate('jwt', {session: false}), // check if logged in
  checkRoles('admin'), //allow this roles to delete registers
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const client = await service.delete(id);
      res.json(client);
    } catch (error) {
      next(error);
    }
});

module.exports = router;