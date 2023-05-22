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
        users.map((singleUser, index) => <li key={index} className="sidebarFriend">
            <Link to={`/profile/${singleUser.username}`} className="sidebarFriendLink">
          <img
            src={
              singleUser.profilePicture
              ? PF + "profilePic/" + singleUser.profilePicture
              : PF + "person/defaultProfPic.png"
            }
            alt=""
            className="sidebarFriendImg"
          />
          <span className="sidebarFriendName">{singleUser.username}</span>
          </Link>
        </li>)
      ) : (
        <li>Sorry, no suggestions found.</li>
      )}
    </div>
  );
}
