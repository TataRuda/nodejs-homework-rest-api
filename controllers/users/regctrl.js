const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const registerUser = async(req, res) => {
  try {           
    const { email, password } = req.body;

    const avatarURL = gravatar.url(email, {
      s: '250',
      r: 'pg',
      d: 'mm',
    })
      
    const existingUser = await User.findOne({ email });
      
    if (existingUser) {
       return res.status(409).json({ message: 'Email in use' }); 
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({
      email,
      subscription: 'starter',
      avatarURL,
      password: hashedPassword, 
      });
      
         
    await newUser.save();
                  
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        },
    })          
    } catch (error){
        console.error(error);
        res.status(500).json({ message: 'Server Error' }) 
    }
}

module.exports = {registerUser}