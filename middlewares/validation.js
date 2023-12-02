const { celebrate, Joi } = require('celebrate');
const { isCyrillic, isEnglish } = require('../utils/constants');

module.exports.signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports.signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.number().required().min(1900).max(2024),
    description: Joi.string().required().min(1).max(100),
    image: Joi.string().required().uri({ scheme: ['http', 'https'] }).required(),
    trailerLink: Joi.string().required().uri({ scheme: ['http', 'https'] }).required(),
    thumbnail: Joi.string().required().uri({ scheme: ['http', 'https'] }).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().pattern(isCyrillic),
    nameEN: Joi.string().required().pattern(isEnglish),
  }),
});

module.exports.deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});
