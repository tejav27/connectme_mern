import "./online.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Online({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [users, setUsers] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/friends/${user._id}`);
      setUsers(res.data);
    };
    fetchUser();
  }, []);

  return (
    <div>
      {Array.isArray(users) ? (
        users.map((user, index) => (
          <li key={index} className="rightbarFriend">
            <Link
              to={`/profile/${user.username}`}
              className="rightbarFriendLink"
            >
              <img
                src={
                  user.profilePicture
                    ? PF + "profilePic/" + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="rightbarFriendImg"
              />
              <span className="rightbarFriendName">{user.username}</span>
            </Link>
          </li>
        ))
      ) : (
        <li>Sorry, no suggestions found.</li>
      )}
    </div>
  );
}
