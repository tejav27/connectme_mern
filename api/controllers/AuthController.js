const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
    registerUser:async (req, res) => {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.password, salt);
      
          const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
          });
      
          const registeredUser = await newUser.save();
          const { password, updatedAt, ...user } = registeredUser._doc;
          res.status(200).json(user);
        } catch (err) {
          res.status(500).json(err)
        }
      },
  
      loginUser: async (req, res) => {
        try {
          const user = await User.findOne({ email: req.body.email });
          !user && res.status(404).json("user not found");
      
          const validPassword = await bcrypt.compare(req.body.password, user.password)
          !validPassword && res.status(400).json("wrong password")
      
          const { password, createdAt, updatedAt, ...newObject } = user._doc;
          console.log("newobject",newObject);
          res.status(200).json(newObject);
        } catch (err) {
          res.status(500).json(err)
        }
      },
  };
  