//create app with express
const express = require('express');
const ExpensesService = require('../services/expenses.service')
const validatorHandler = require('../middlewares/validator.handler');
const { createExpenseSchema, updateExpenseSchema, getExpenseSchema } = require('../schemas/expenses.schema');

const router = express.Router();
const service = new ExpensesService();

//get all registers
router.get('/', async (req, res) => {
  const expenses = await service.find();
  res.json(expenses);
});

//register filter
router.get('/filter', (req, res) => {
    res.send('Yo soy un filter');
});

//get url parameters - get one register
router.get('/:id',
  validatorHandler(getExpenseSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const expense = await service.findOne(id);
      res.json(expense);
    } catch (error) {
      next(error);
    }
  }
);

//create register
router.post('/',
  validatorHandler(createExpenseSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newExpense = await service.create(body);
    res.status(201).json(newExpense);
  }
);

//update register (some data)
router.patch('/:id',
  validatorHandler(getExpenseSchema, 'params'),
  validatorHandler(updateExpenseSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const body = req.body;
      const expense = await service.update(id, body);
      res.json(expense);
    } catch (error) {
      next(error);
    }
  }
);

//delete register
router.delete('/:id', async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const expense = await service.delete(id);
      res.json(expense);
    } catch (error) {
      next(error);
    }
});

module.exports = router;