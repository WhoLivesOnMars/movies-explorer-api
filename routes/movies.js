const router = require('express').Router();
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validation');
const {
  getMovies, getUserMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/all', getMovies);
router.get('/', getUserMovies);
router.post('/', createMovieValidation, createMovie);
router.delete('/:_id', deleteMovieValidation, deleteMovie);

module.exports = router;
