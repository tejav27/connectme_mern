import "./post.css";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Post({ post, updatePostsFetch }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [isComments, setIsComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [stateChanged, setStateChanged] = useState(true);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId, stateChanged]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get("/posts/" + post._id + "/comments");
      setComments(res.data);
    };
    fetchComments();
  }, [stateChanged]);

  const likeHandler = async () => {
    try {
      await axios.put("/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  const handleDeletePost = async () => {
    try{
      await axios.delete("/posts/"+post._id, {
        data: {
          userId: currentUser._id,
        }
      });
      setStateChanged(!stateChanged);
      updatePostsFetch(true);
    }catch(err){
      console.log("couldn't delete post");
    }
  };
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    setComment("");
    commentHandler();
    setStateChanged(!stateChanged);
  };

  const commentHandler = async () => {
    try {
      await axios.post("/posts/" + post._id + "/comment", {
        userId: currentUser._id,
        commentText: comment,
      });
    } catch (err) {}
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link className="postProfileLink" to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + "profilePic/" + user.profilePicture
                    : PF + "person/defaultProfPic.png"
                }
                alt=""
              />
              <span className="postUsername">{user.username}</span>
            </Link>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            < DeleteIcon onClick={handleDeletePost} style={{cursor: "pointer"}} />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomMain">
            <div className="postBottomLeft">
              {isLiked ? (
                <ThumbUpAltIcon onClick={likeHandler} />
              ) : (
                <ThumbUpAltOutlinedIcon onClick={likeHandler} />
              )}
              <p className="postLikeCounter">
                {like} <span>Likes</span>
              </p>
            </div>
            <IconButton
              className="postBottomRight"
              onClick={() => setIsComments(!isComments)}
            >
              <ChatBubbleOutlineOutlined />
              <Typography className="postCommentText">
                {comments.length} comments
              </Typography>
            </IconButton>
          </div>
          <form className="postBottomForm" onSubmit={handleCommentSubmit}>
            <textarea
              placeholder="Write your comment here"
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
            <button onClick={handleCommentSubmit} type="submit">
              Send
            </button>
          </form>
          {isComments && (
            <Box mt="0.5rem">
              {comments.map((comment) => (
                <Box key={comment._id}>
                  <Divider />
                  <Typography sx={{ m: "0.5rem 0", pl: "1rem" }}>
                    <Link
                      className="postProfileLink"
                      to={`/profile/${comment.username}`}
                    >
                      {comment.userName}
                    </Link>
                    {comment.text}
                  </Typography>
                </Box>
              ))}
              <Divider />
            </Box>
            //          <div>
            //   {comments.map((comment) => (
            //     <div key={comment._id}>
            //       <span>{comment.userName}: </span>
            //       <span>{comment.text}</span>
            //     </div>
            //   ))}
            // </div>
          )}
        </div>
      </div>
    </div>
  );
}
