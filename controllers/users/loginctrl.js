const User = require('../../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET_KEY;

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user || !(await user.validPassword(password))) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Incorrect login or password',
        data: 'Bad request',
      });
    }
  
    const payload = { id: user._id };  
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    user.token = token;
    await user.save();
   
    res.json({
      status: 'success',
      code: 200,
      data: {
        user
      },
    });

  } catch (error){
      console.error(error);
      res.status(500).json({ message: 'Server Error' }) 
  }
  };

module.exports = { loginUser }