const  User  = require('../../models/user');

const logoutUser = async (req, res) => {
    const user = req.user;
    console.log(user); 

    if (!user) {
        return res.status(401).json({
        status: 'error',
        code: 401,
        message: "Not authorized",
        });
        }

    await User.findByIdAndUpdate(user._id, { token: "" })
    res.status(204).json({
        status: 'success',
        code: 204,
        message: 'No Content',
        });
    
};

module.exports = { logoutUser };
