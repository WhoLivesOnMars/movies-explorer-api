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
  origin: ['https://movies.app.nomoredomainsmonster.ru', 'https://movies.app.nomoredomainsmonster.ru/signup', 'https://movies.app.nomoredomainsmonster.ru/signin', 'https://movies.app.nomoredomainsmonster.ru/profile', 'https://movies.app.nomoredomainsmonster.ru/movies', 'https://movies.app.nomoredomainsmonster.ru/saved-movies'],
  credentials: true,
};

app.use(cors(corsOptions));

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
