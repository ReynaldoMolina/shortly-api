const { CategoriesSchema, Categories } = require('./categories.model');
const { ClientsSchema, Clients } = require('./clients.model');
const { ExpensesSchema, Expenses } = require('./expenses.model');
const { OrdersSchema, Orders } = require('./orders.model');
const { OrdersDetailsSchema, OrdersDetails } = require('./ordersdetails.model');
const { ProductsSchema, Products } = require('./products.model');
const { ProductsPageSchema, ProductsPage } = require('./productspage.model');
const { ProvidersSchema, Providers } = require('./providers.model');
const { PurchasesSchema, Purchases } = require('./purchases.model');
const { PurchasesDetailsSchema, PurchasesDetails } = require('./purchasesdetails.model');
const { SalesSchema, Sales } = require('./sales.model');
const { UsersSchema, Users } = require('./users.model');

function setupModels(sequelize) {
  Categories.init(CategoriesSchema, Categories.config(sequelize));
  Clients.init(ClientsSchema, Clients.config(sequelize));
  Expenses.init(ExpensesSchema, Expenses.config(sequelize));
  Orders.init(OrdersSchema, Orders.config(sequelize));
  OrdersDetails.init(OrdersDetailsSchema, OrdersDetails.config(sequelize));
  Products.init(ProductsSchema, Products.config(sequelize));
  ProductsPage.init(ProductsPageSchema, ProductsPage.config(sequelize));
  Providers.init(ProvidersSchema, Providers.config(sequelize));
  Purchases.init(PurchasesSchema, Purchases.config(sequelize));
  PurchasesDetails.init(PurchasesDetailsSchema, PurchasesDetails.config(sequelize));
  Sales.init(SalesSchema, Sales.config(sequelize));
  Users.init(UsersSchema, Users.config(sequelize));

  Categories.associate(sequelize.models);
  Clients.associate(sequelize.models);
  Expenses.associate(sequelize.models);
  Orders.associate(sequelize.models);
  OrdersDetails.associate(sequelize.models);
  Products.associate(sequelize.models);
  ProductsPage.associate(sequelize.models);
  Providers.associate(sequelize.models);
  Purchases.associate(sequelize.models);
  PurchasesDetails.associate(sequelize.models);
  Sales.associate(sequelize.models);
  Users.associate(sequelize.models);
}

module.exports = setupModels;