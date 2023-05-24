const User = require("../models/User");
const multer = require('multer');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const UserController = require('../controllers/UserController')
const router = require("express").Router();
const Authenticate = require('../middleware/Authenticate');

//upload cover picture for a user
const storageCover = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/coverPic");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.originalname;
    cb(null, filename);
  },
});
const uploadCover = multer({ storage: storageCover });

router.put('/:id/uploadCoverPic', Authenticate.isLoggedIn, uploadCover.single('coverPicture'), async (req, res) => {
  try {
    const userId = req.params.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { coverPicture: file.filename },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//upload profile picture for a user
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/profilePic");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.originalname;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

router.put('/:id/uploadProfPic', Authenticate.isLoggedIn, upload.single('profilePicture'), async (req, res) => {
  try {
    const userId = req.params.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: file.filename },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/", Authenticate.isLoggedIn, UserController.getUser)
router.get("/all", Authenticate.isLoggedIn, UserController.allUsers)
router.put("/:id", Authenticate.isLoggedIn, UserController.updateUser)
router.delete("/:id", Authenticate.isLoggedIn, UserController.deleteUser)
router.get("/friends/:userId", Authenticate.isLoggedIn, UserController.userFriends)
router.get("/suggestedfriends/:userId", Authenticate.isLoggedIn, UserController.suggestedFriends)
router.put("/:id/follow",  Authenticate.isLoggedIn, UserController.followUser)
router.put("/:id/unfollow", Authenticate.isLoggedIn, UserController.unfollowUser)

module.exports = router;