const { sendEmail } = require('../../helpers/sendEmail');
const  User  = require('../../models/user');

 const verificationUser = async (req, res) => {
    try{ 
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
     
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
      
    await User.findByIdAndUpdate(user._id, {
      verificationToken: "",
      verify: true,
    });
  
    res.json({ message: "Verification successful" })

    } catch (error){
        console.error(error);
        res.status(500).json({ message: 'Server Error' }) 
    }
};

const resendEmail = async (req, res) => {
    try { 
    const { email } = req.body;    
    const user = await User.findOne({ email });

    if (user.verify) {
        return res.status(400).json({ message: 'Verification has already been passed' });
    }
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    await sendEmail({email, verificationToken: user.verificationToken})
    res.status(200).json({ message: 'Verification email sent' });

    } catch (error){
    console.error(error);
    res.status(500).json({ message: 'Server Error' }) 
}
}


module.exports = { 
    verificationUser,
    resendEmail 
};