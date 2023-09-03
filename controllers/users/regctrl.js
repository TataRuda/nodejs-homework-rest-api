const User = require('../../models/user');

const registerUser = async(req, res) => {
  try {           
    const { email, password } = req.body;
      
    const existingUser = await User.findOne({ email });
      
    if (existingUser) {
       return res.status(409).json({ message: 'Email in use' }); 
    }
                 
    const newUser = new User({
      email,
      subscription: 'starter', 
      });
      
    newUser.setPassword(password)
      
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