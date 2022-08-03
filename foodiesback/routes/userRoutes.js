const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Middle = require('../middlewares/authenticateToken')

router.post('/register', userController.register);
router.post('/login', userController.login);

// Favorites
router.post('/addfavorite', userController.addFavorite); // CREATE
router.post('/removefavorite', userController.removeFavorite); // DELETE
router.get('/getfavorites', userController.getFavorites); // GET


router.post('/logout', userController.logout);
router.post('/checktoken', userController.checkToken);

module.exports = router;