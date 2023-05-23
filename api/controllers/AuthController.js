const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const duplicateUser = await User.findOne({ email: req.body.email });
      if(!duplicateUser){
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });
  
        const registeredUser = await newUser.save();
        const { password, updatedAt, ...user } = registeredUser._doc;
        let token = jwt.sign(
          {
            userId: user.userId,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        console.log("token", token);

        res.status(200).json({user, token});
      }else{
        res.status(400).json("Email already exists!!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(404).json("user not found");

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      !validPassword && res.status(400).json("wrong password");

      const { password, createdAt, updatedAt, ...newUser } = user._doc;
      let token = jwt.sign(
        {
          userId: newUser.userId,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      console.log("token", token);
      res.status(200).json({user:newUser, token});
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

const authenticate = async (email, password) => {
  if (!email || !password) {
    throw new InvalidCredentials();
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new InvalidCredentials();
  }
  if (!bcrypt.compareSync(password, user.password)) {
    throw new InvalidCredentials();
  } else {
    let token = await jwt.sign(
      {
        userId: user.userId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return { token };
  }
};
