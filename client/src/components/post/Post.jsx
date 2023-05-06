import "./post.css";
import { MoreVert } from "@material-ui/icons";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import {
  ChatBubbleOutlineOutlined
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [isComments, setIsComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");


  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  const handlePostOptions = () => {

  }
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    setComments([...comments, comment]);
    setComment("");
  };
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  console.log("comments::", comments)
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
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            <span className="postUsername">{user.username}</span>
            </Link>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert onClick={handlePostOptions}/>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomMain">
          <div className="postBottomLeft">
            {isLiked? <ThumbUpAltIcon onClick={likeHandler} /> : <ThumbUpAltOutlinedIcon onClick={likeHandler}/>} 
            <p className="postLikeCounter">{like} <span>Likes</span></p>
          </div>
          <IconButton className="postBottomRight" onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            <Typography className="postCommentText">{post.comments.length} comments</Typography>
            </IconButton>
          </div>
            <form className="postBottomForm" onSubmit={handleCommentSubmit}>
        <textarea
          placeholder="Write your comment here"
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
        <button type="submit">Send</button>
      </form>
            {/* {isComments && (
        <Box mt="0.5rem">
          {post.comments.map((comment, i) => (
            <Box key={`${post.username}-${i}`}>
              <Divider />
              <Typography sx={{ m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )} */}
        </div>
      </div>
    </div>
  );
}
