const express = require('express');
const { registerUser,
        loginUser,
        logoutUser, 
        getCurrentUser, 
        updateAvatar,
        updateSubscription,
        verificationUser, 
        resendEmail } = require('../../controllers/users');
const { authenticate } = require('../../middlewares/authenticate');
const { userValidation, 
        validationEmail } = require('../../middlewares/validationUser');
const { uploadAvatar } = require('../../middlewares/uploadAvatar');

const router = express.Router();

router.post('/register', userValidation, registerUser);
router.post('/login', userValidation, loginUser);
router.post('/logout', authenticate, logoutUser);
router.get('/current', authenticate, getCurrentUser);
router.patch('/avatars', authenticate,  uploadAvatar.single('avatar'), updateAvatar );
router.patch('/subscription', authenticate,  updateSubscription );

router.get('/verify/:verificationToken', verificationUser);
router.post('/verify', validationEmail,  resendEmail);

module.exports = router;
