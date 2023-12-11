require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const app = express();
const { PORT = 3000 } = process.env;
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const limiter = require('./middlewares/rate-limiter');

const { MONGO_URL } = require('./utils/config');

const corsOptions = {
  origin: '*',
  credentials: true,
};

app.use(cors(corsOptions));

/* const whitelist = ['http://localhost:3000', 'http://localhost:3001'];

const corsOptionsCheck = (req, callback) => {
  let corsOptions;

  const isDomainAllowed = whitelist.indexOf(req.header('Origin')) !== -1;

  if (isDomainAllowed) {
    // Enable CORS for this request
    corsOptions = { credentials: true, origin: true };
  } else {
    // Disable CORS for this request
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

app.use(cors(corsOptionsCheck));
app.options('*', (req, res) => {
  if (whitelist.indexOf(req.headers.origin) !== -1) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  }
  res.send('ok');
});
app.use((req, res, next) => {
  if (whitelist.indexOf(req.headers.origin) !== -1) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  }
  next();
});
*/
app.use(helmet());
mongoose.connect(MONGO_URL, { useNewUrlParser: true }).then(() => {
  console.log('Connected to db');
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);
app.use(limiter);
app.use('/', routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
