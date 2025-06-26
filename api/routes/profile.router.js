//create app with express
const express = require('express');
const passport = require('passport');
const OrderService = require('../services/orders.service');
const { queryOrderSchema } = require('../schemas/orders.schema');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();
const service = new OrderService();

router.get('/',
  async (req, res, next) => {
    const message = 'Hola';
    res.json(message);
  }
);

// login
router.get('/myorders',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(queryOrderSchema, 'query'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await service.findByUser(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;