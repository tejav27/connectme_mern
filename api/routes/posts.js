const Post = require("../models/Post");
const User = require("../models/User");
const PostController = require('../controllers/PostController')
const router = require("express").Router();
const Authenticate = require('../middleware/Authenticate');

router.post("/", Authenticate.isLoggedIn, PostController.createPost);
router.put("/:id", Authenticate.isLoggedIn, PostController.updatePost);
router.delete("/:id", Authenticate.isLoggedIn,  PostController.deletePost);
router.put("/:id/like", Authenticate.isLoggedIn,  PostController.likePost);
router.get("/:id", Authenticate.isLoggedIn, PostController.getPost);
router.get("/timeline/:userId", Authenticate.isLoggedIn, PostController.timelinePosts);
router.get("/profile/:username", Authenticate.isLoggedIn,  PostController.usersPosts);
router.post("/:id/comment", Authenticate.isLoggedIn, PostController.addComment);
router.get("/:id/comments", Authenticate.isLoggedIn, PostController.getComments);

module.exports = router;
