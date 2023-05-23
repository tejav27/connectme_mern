import "./FriendsList.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function FriendsList({ user }) {
  const { token } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [users, setUsers] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/friends/${user._id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }).then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.log("Error :", error);
        });
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
                    : PF + "person/defaultProfPic.png"
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
