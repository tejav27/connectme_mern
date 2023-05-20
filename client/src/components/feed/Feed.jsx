import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id, updated]);

  const updatePostsFetch = (update) => {
    if(update){
      setUpdated(!updated);
    }
  }

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share updatePostsFetch={updatePostsFetch} />}
        {posts.map((post) => (
          <Post key={post._id} post={post} updatePostsFetch={updatePostsFetch}/>
        ))}
      </div>
    </div>
  );
}
