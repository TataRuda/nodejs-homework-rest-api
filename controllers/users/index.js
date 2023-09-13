const { registerUser } = require('./regctrl');
const { loginUser } = require('./loginctrl');
const { logoutUser } = require('./logoutctrl');
const { getCurrentUser } = require('./getcurrentctrl');
const { updateAvatar } = require('./updateavactrl');
const { updateSubscription } = require('./updatestatusctrl');
const { verificationUser, resendEmail } = require('./verificationctrl');


module.exports = { 
    registerUser,
    logoutUser,
    loginUser,
    getCurrentUser,
    updateAvatar,
    updateSubscription,
    verificationUser,
    resendEmail
}
