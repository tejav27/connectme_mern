const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
    createPost: async (req, res) => {
        const newPost = new Post(req.body);
        try {
          const savedPost = await newPost.save();
          res.status(200).json(savedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    
      updatePost: async (req, res) => {
        try {
          const post = await Post.findById(req.params.id);
          if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("the post has been updated");
          } else {
            res.status(403).json("you can update only your post");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      },
    
      deletePost: async (req, res) => {
        try {
          const post = await Post.findById(req.params.id);
          if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
          } else {
            res.status(403).json("you can delete only your post");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      },
    
      likePost: async (req, res) => {
        try {
          const post = await Post.findById(req.params.id);
          if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked");
          } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been disliked");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      },
    
      getPost: async (req, res) => {
        try {
          const post = await Post.findById(req.params.id);
          res.status(200).json(post);
        } catch (err) {
          res.status(500).json(err);
        }
      },

      timelinePosts: async (req, res) => {
        try {
          const currentUser = await User.findById(req.params.userId);
          const userPosts = await Post.find({ userId: currentUser._id });
          const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
              return Post.find({ userId: friendId });
            })
          );
          res.status(200).json(userPosts.concat(...friendPosts));
        } catch (err) {
          res.status(500).json(err);
        }
      },

      usersPosts: async (req, res) => {
        try {
          const user = await User.findOne({ username: req.params.username });
          const posts = await Post.find({ userId: user._id });
          res.status(200).json(posts);
        } catch (err) {
          res.status(500).json(err);
        }
      },

      addComment: async (req, res) =>{
        let user = await User.findOne({ _id:req.body.userId  });
        try{
          Post.findByIdAndUpdate(
            req.params.id,
            { $push: { comments: { userId: req.body.userId, text: req.body.commentText, userName:user.username } } },
            { new: true },
            (err, post) => {
              if (err) {
                res.status(404).json(err);
              } else {
                res.status(200).json(post);
              }
            }
          );
        }catch(err){
          res.status(500).json(err);
        }
      },

      getComments: async(req,res) =>{
        try{
          const post = await Post.findById(req.params.id);
          const comments = post.comments;
          if(comments){
            res.status(200).json(comments)
          }else{
            res.status(204).json({meesage:"No comments found"});
          }
        }catch(err){
          res.status(500).json(err);
        }
      }
    
}