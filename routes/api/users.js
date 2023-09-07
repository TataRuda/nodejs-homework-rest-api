const express = require('express');
const { registerUser,
        loginUser,
        logoutUser, 
        getCurrentUser, 
        updateAvatar } = require('../../controllers/users');
const { authenticate } = require('../../middlewares/authenticate');
const { userValidation } = require('../../middlewares/validationUser');
const { uploadAvatar } = require('../../middlewares/uploadAvatar');

const router = express.Router();

router.post('/register', userValidation, registerUser);
router.post('/login', userValidation, loginUser);
router.post('/logout', authenticate, logoutUser);
router.get('/current', authenticate, getCurrentUser);
router.patch('/avatars', authenticate,  uploadAvatar.single('avatar'), updateAvatar )

module.exports = router;
