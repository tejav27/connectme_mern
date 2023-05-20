import "./SuggestedFriends.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SuggestedFriends({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchSuggestedFriends = async () => {
      const res = await axios.get(`/users/suggestedfriends/${user._id}`);
      const suggestedFriends = res.data;
      setUsers(suggestedFriends);
    };
    fetchSuggestedFriends();
  }, []);

  return (
    <div>
      {Array.isArray(users) ? (
        users.map((user, index) => <li key={index} className="sidebarFriend">
            <Link to={`/profile/${user.username}`} className="sidebarFriendLink">
          <img
            src={
              user.profilePicture
              ? PF + "profilePic/" + user.profilePicture
              : PF + "person/noAvatar.png"
            }
            alt=""
            className="sidebarFriendImg"
          />
          <span className="sidebarFriendName">{user.username}</span>
          </Link>
        </li>)
      ) : (
        <li>Sorry, no suggestions found.</li>
      )}
    </div>
  );
}
