const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bCrypt = require("bcryptjs");

const userSchema = new Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
  })

  userSchema.pre('save', async function () {
    if (this.isNew) {
      this.password = await bCrypt.hash(this.password, 9)
    }
  })
  
  userSchema.methods.validPassword = async function (password) {
    console.log("Input password:", password);
    console.log("Stored password hash:", this.password);
    const result = await bCrypt.compare(password, this.password)
    console.log(result);
    return result
  }

  const User = model('user', userSchema);

module.exports = User;