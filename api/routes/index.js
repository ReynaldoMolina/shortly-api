const express = require('express');

const clientsRouter = require('./clients.router');
const ordersRouter = require('./orders.router');
const ordersDetailsRouter = require('./ordersdetails.router');
const salesRouter = require('./sales.router');
const providersRouter = require('./providers.router');
const expensesRouter = require('./expenses.router');
const purchasesRouter = require('./purchases.router');
const purchasesDetailsRouter = require('./purchasesdetails.router');
const productsRouter = require('./products.router');
const productsPageRouter = require('./productspage.router');
const categoriesRouter = require('./categories.router');
const receiptsRouter = require('./receipts.router');
const usersRouter = require('./users.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/clients', clientsRouter);
  router.use('/orders', ordersRouter);
  router.use('/ordersdetails', ordersDetailsRouter);
  router.use('/sales', salesRouter);
  router.use('/providers', providersRouter);
  router.use('/purchases', purchasesRouter);
  router.use('/purchasesdetails', purchasesDetailsRouter);
  router.use('/expenses', expensesRouter);
  router.use('/products', productsRouter);
  router.use('/productspage', productsPageRouter);
  router.use('/categories', categoriesRouter);
  router.use('/receipts', receiptsRouter);
  router.use('/users', usersRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
}

module.exports = routerApi;