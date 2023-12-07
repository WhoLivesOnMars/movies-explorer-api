require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

const { ok, created, duplicate } = require('../utils/constants');

const { SECRET_KEY } = require('../utils/config');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь с указанным id не существует');
    })
    .then((user) => {
      res.status(ok).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        next(new BadRequestError('Некорректный формат _id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    })
      .then((user) => res.status(created).send({
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      }))
      .catch((err) => {
        if (err.code === duplicate) {
          next(new ConflictError('Пользователь с указанным email уже существует'));
        } else if (err.name === 'ValidationError') {
          next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
        } else {
          next(err);
        }
      }));
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь с указанным id не существует');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      if (user) {
        const token = jwt.sign(
          { _id: user._id },
          SECRET_KEY,
          { expiresIn: '7d' },
        );
        res.status(ok).send({ token });
      }
    })
    .catch((err) => {
      next(err);
    });
};
