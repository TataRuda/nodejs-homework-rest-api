const express = require('express');
const { registerUser,
        loginUser,
        logoutUser, 
        getCurrentUser } = require('../../controllers/users');
const { authenticate } = require('../../middlewares/authenticate');
const { userValidation } = require('../../middlewares/validationUser');

const router = express.Router();

router.post('/register', userValidation, registerUser);
router.post('/login', userValidation, loginUser);
router.post('/logout', authenticate, logoutUser);
router.get('/current', authenticate, getCurrentUser);

module.exports = router;
