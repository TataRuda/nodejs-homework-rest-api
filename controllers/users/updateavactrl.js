const path = require('path');
const fs = require("fs").promises;
const resizeFile = require('../../helpers/handleFile');
const User = require('../../models/user');

const updateAvatar = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { _id } = req.user;
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' }); 
    }
    
    const { path: tmpUploadDir, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const staticUploadDir = path.join(
      process.cwd(),
      'public',
      'avatars',
      filename
    ); // dir for saving avatar

    await resizeFile(tmpUploadDir);

    await fs.rename(tmpUploadDir, staticUploadDir); // relocate avatar from tmp to public

    const avatarURL = path.join('avatars', filename);
    const user = await User.findByIdAndUpdate(
      _id,
      { avatarURL },
      {
        new: true,
      }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: { avatarURL } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { updateAvatar };

