const mongoose = require('mongoose');
const validator = require('validator');

const { isCyrillic, isEnglish, filmYear } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    validate: {
      validator: (v) => filmYear.test(v),
      message: 'Год выпуска фильма должен быть в промежутке от 1900 до 2024',
    },
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неправильный URL',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неправильный URL',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неправильный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isCyrillic.test(v),
      message: 'Название фильма должно быть на русском языке',
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isEnglish.test(v),
      message: 'Название фильма должно быть на английском языке',
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
