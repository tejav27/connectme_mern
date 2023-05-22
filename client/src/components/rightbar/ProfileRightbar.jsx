import "./rightbar.css";
import FriendsList from "../FriendsList/FriendsList";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import EditProfile from "./EditProfile";

export default function ProfileRightbar({ user }) {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const isUserFollowed = currentUser.followings.includes(user._id);
    setFollowed(isUserFollowed);
  }, [currentUser, user]);

  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
      {user._id !== currentUser._id ? (
        <div>
          <button className="rightbarFollowButton" onClick={handleFollow}>
            {followed ? "Unfollow" : "Follow"}
          </button>
        <br />
        <br />
        <h4 className="rightbarTitle">About {user.username}</h4>
        <span className="rightbarInfoKey">
          Few words about {user.username}:
        </span>
        <span className="rightbarInfoValue">{user.desc}</span>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">School/Work:</span>
            <span className="rightbarInfoValue">{user.school}</span>
          </div>
          <span />
        </div>
        <h4 className="rightbarTitle">{user.username}'s friends</h4>
        </div>
         ) : (
          <EditProfile/>
        )}
        <ul className="rightbarFriendList">
          <FriendsList user={user} />
        </ul>
      </div>
    </div>
  );
}
