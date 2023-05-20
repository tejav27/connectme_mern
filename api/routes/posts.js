const Post = require("../models/Post");
const User = require("../models/User");





const PostController = require('../controllers/PostController')
const router = require("express").Router();

router.post("/", PostController.createPost);
router.put("/:id", PostController.updatePost);
router.delete("/:id",  PostController.deletePost);
router.put("/:id/like", PostController.likePost);
router.get("/:id", PostController.getPost);
router.get("/timeline/:userId", PostController.timelinePosts);
router.get("/profile/:username",  PostController.usersPosts);
router.post("/:id/comment", PostController.addComment);
router.get("/:id/comments", PostController.getComments);

module.exports = router;
