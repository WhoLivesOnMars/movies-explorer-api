const router = require('express').Router();

const { notFound } = require('../controllers/notFoundError');

router.use('/*', notFound);

module.exports = router;
