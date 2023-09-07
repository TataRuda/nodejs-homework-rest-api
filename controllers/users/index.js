const { registerUser } = require('./regctrl');
const { loginUser } = require('./loginctrl');
const { logoutUser } = require('./logoutctrl');
const { getCurrentUser } = require('./getcurrentctrl');
const { updateAvatar } = require('./updateavactrl');



module.exports = { 
    registerUser,
    logoutUser,
    loginUser,
    getCurrentUser,
    updateAvatar,
}
