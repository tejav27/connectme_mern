import "./usersFriend.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function UsersFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get('/users/all');
      const allUsers = res.data;
      let suggestedFriends = allUsers.filter(item => item._id!==user._id)
      // suggestedFriends.filter(item => item._id !== user.foll)
      // const results = allUsers.filter(({ _id: id1 }) => !suggestedFriends.followings.some((id2) => id2 === id1));
      // console.log("results::", results);
      setUsers(suggestedFriends);
    };
    fetchUser();
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
