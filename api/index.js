const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.port || 3001;

app.use(express.json());

const whitelist = [
  'http://localhost:3000',
  'http://localhost:4321',
  'http://192.168.1.7:3000',
  'https://urlshortener-rm.vercel.app'
];

const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    }
    else {
      callback(new Error('No permitido'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'api'],
};

app.use(cors(options));
app.options('*', cors(options));

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//empezar a escuchar en el puerto
app.listen(port, () => {
  console.log(`Mi puerto: ${port}`);
});
