//create app with express
const express = require('express');
const passport = require('passport');
const CategoriesService = require('../services/categories.service')
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/categories.schema');

const router = express.Router();
const service = new CategoriesService();

//get all registers
router.get('/',
  passport.authenticate('jwt', {session: false}), // check if logged in
  checkRoles('admin', 'client'), //allow this roles to get registers
  async (req, res, next) => {
    try {
      const categories = await service.find();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
);

//get url parameters - get one register
router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

//create register
router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

//update register (some data)
router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

//delete register
router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const category = await service.delete(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

module.exports = router;