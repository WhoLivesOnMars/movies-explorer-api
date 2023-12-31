const mongoose = require('mongoose');
const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

const { ok, created } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(ok).send({ data: movies }))
    .catch((err) => {
      next(err);
    });
};

/* module.exports.getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail(() => {
      throw new NotFoundError('Фильм не найден');
    })
    .then((movies) => {
      const userMovies = movies.filter((m) => m.owner._id.toString() === req.user._id);
      res.status(ok).send({ data: userMovies });
    })
    .catch((err) => {
      next(err);
    });
}; */

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм не найден');
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалить этот фильм');
      } else {
        Movie.findByIdAndRemove(req.params.movieId)
          .then(() => {
            res.status(ok).send({ message: 'Фильм удален' });
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        next(new BadRequestError('Некорректный формат _id фильма'));
      } else {
        next(err);
      }
    });
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    trailerLink: req.body.trailerLink,
    thumbnail: req.body.thumbnail,
    owner: req.user._id,
    movieId: req.body.movieId,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
  })
    .then((movie) => res.status(created).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};
