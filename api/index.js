//crear app con express
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/auth.handler');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.port || 3001;

app.use(express.json());

const whitelist = [
  'http://localhost:3000',
  'http://localhost:4321',
  'http://192.168.1.7:3000',
  'https://reynaldomolina.github.io'
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    }
    else {
      callback(new Error('No permitido'));
    }
  }
};
app.use(cors(options));

// use auth strategy
require('./utils/auth');

//create endpoints
app.get('/api', (req, res) => {
  res.send('Welcome to the Jahaira Store API');
});

app.get('/test', checkApiKey, (req, res) => {
  res.send("Hi, I'm a new route");
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//emmpezar a escuchar en el puerto
app.listen(port, () => {
  console.log(`Mi puerto: ${port}`);
});
