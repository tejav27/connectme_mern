import "./rightbar.css";
import FriendsList from "../FriendsList/FriendsList";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function ProfileRightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const isUserFollowed = currentUser.followings.includes(user._id);
    setFollowed(isUserFollowed);
  }, [currentUser, user]);


  console.log(" currentUser.followings.includes(user._id)", currentUser.followings.includes(user._id));
  console.log("follwed", followed);

  const handleClick = async () => {
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
      {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
          </button>
        )}
        <h4 className="rightbarTitle">About {user.username}</h4>
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
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">{user.username}'s friends</h4>
        <ul className="rightbarFriendList">
          <FriendsList user={user}/>
        </ul>
      </div>
    </div>
  );
}
