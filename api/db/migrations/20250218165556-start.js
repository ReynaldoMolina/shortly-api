'use strict';

/** @type {import('sequelize-cli').Migration} */
const { CategoriesSchema, CATEGORIES_TABLE } = require('../models/categories.model');
const { ClientsSchema, CLIENTS_TABLE } = require('../models/clients.model');
const { ExpensesSchema, EXPENSES_TABLE } = require('../models/expenses.model');
const { OrdersSchema, ORDERS_TABLE } = require('../models/orders.model');
const { OrdersDetailsSchema, ORDERSDETAILS_TABLE } = require('../models/ordersdetails.model');
const { ProductsSchema, PRODUCTS_TABLE } = require('../models/products.model');
const { ProductsPageSchema, PRODUCTSPAGE_TABLE } = require('../models/productspage.model');
const { ProvidersSchema, PROVIDERS_TABLE } = require('../models/providers.model');
const { PurchasesSchema, PURCHASES_TABLE } = require('../models/purchases.model');
const { PurchasesDetailsSchema, PURCHASESDETAILS_TABLE } = require('../models/purchasesdetails.model');
const { SalesSchema, SALES_TABLE } = require('../models/sales.model');
const { UsersSchema, USERS_TABLE } = require('../models/users.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CATEGORIES_TABLE, CategoriesSchema);
    await queryInterface.createTable(CLIENTS_TABLE, ClientsSchema);
    await queryInterface.createTable(EXPENSES_TABLE, ExpensesSchema);
    await queryInterface.createTable(ORDERS_TABLE, OrdersSchema);
    await queryInterface.createTable(ORDERSDETAILS_TABLE, OrdersDetailsSchema);
    await queryInterface.createTable(PRODUCTS_TABLE, ProductsSchema);
    await queryInterface.createTable(PRODUCTSPAGE_TABLE, ProductsPageSchema);
    await queryInterface.createTable(PROVIDERS_TABLE, ProvidersSchema);
    await queryInterface.createTable(PURCHASES_TABLE, PurchasesSchema);
    await queryInterface.createTable(PURCHASESDETAILS_TABLE, PurchasesDetailsSchema);
    await queryInterface.createTable(SALES_TABLE, SalesSchema);
    await queryInterface.createTable(USERS_TABLE, UsersSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CATEGORIES_TABLE);
    await queryInterface.dropTable(CLIENTS_TABLE);
    await queryInterface.dropTable(EXPENSES_TABLE);
    await queryInterface.dropTable(ORDERS_TABLE);
    await queryInterface.dropTable(ORDERSDETAILS_TABLE);
    await queryInterface.dropTable(PRODUCTS_TABLE);
    await queryInterface.dropTable(PRODUCTSPAGE_TABLE);
    await queryInterface.dropTable(PROVIDERS_TABLE);
    await queryInterface.dropTable(PURCHASES_TABLE);
    await queryInterface.dropTable(PURCHASESDETAILS_TABLE);
    await queryInterface.dropTable(SALES_TABLE);
    await queryInterface.dropTable(USERS_TABLE);
  }
};
