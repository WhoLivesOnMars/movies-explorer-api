const router = require('express').Router();
const { signupValidation, signinValidation } = require('../middlewares/validation');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { notFound } = require('../controllers/notFoundError');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, login);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('/*', notFound);

module.exports = router;
