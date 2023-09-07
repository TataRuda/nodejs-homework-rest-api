const Jimp = require("jimp");

const resizeFile = async (fullPathToFile) => {
  const avatar = await Jimp.read(fullPathToFile);
  avatar.resize(250, 250); // resize
  await avatar.writeAsync(fullPathToFile); // rewrite file
};

module.exports = resizeFile;