
const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
  
  if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
  }

  if (!user.email || !user.subscription) {
      return res.status(500).json({ message: 'User data is incomplete' });
  }

  const { email, subscription } = user;

  res.status(200).json({
      email,
      subscription,
  });
} catch (error){
    console.error(error);
    res.status(500).json({ message: 'Server Error' }) 
}
};

module.exports = { getCurrentUser };

  