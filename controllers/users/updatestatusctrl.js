const  User  = require('../../models/user');

const updateSubscription = async (req, res) => {
    try {
      
    if (!req.user) {
        return res.status(401).json({ message: 'Not authorized' });
    };

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { subscription: req.body.subscription },
        { new: true }
    );

    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    };

    const { email, subscription } = updatedUser;    
  
    res.status(200).json({ 
        email,
        subscription,
    });
  } catch (error){
      console.error(error);
      res.status(500).json({ message: 'Server Error' }) 
  }
  };
  
  module.exports = { updateSubscription };