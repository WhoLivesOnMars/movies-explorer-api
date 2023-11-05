const router = require('express').Router();
const { updateUserValidation } = require('../middlewares/validation');
const {
  getUsers,
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.get('/', getUsers);
router.patch('/me', updateUserValidation, updateUser);

module.exports = router;
