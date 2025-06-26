//create app with express
const express = require('express');
const passport = require('passport');
const UsersService = require('../services/users.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/users.schema');

const router = express.Router();
const service = new UsersService();

// get all registers
router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const users = await service.find();
      res.json(users);
    } catch (error) {
      next(error);
    }
});

//get url parameters - get one register
router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

//create register
router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

//update register (some data)
router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
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
      const user = await service.delete(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
});

module.exports = router;