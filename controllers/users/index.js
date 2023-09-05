const { registerUser } = require('./regctrl');
const { loginUser } = require('./loginctrl');
const { logoutUser } = require('./logoutctrl');
const { getCurrentUser } = require('./getcurrentctrl');


module.exports = { 
    registerUser,
    logoutUser,
    loginUser,
    getCurrentUser,
}
