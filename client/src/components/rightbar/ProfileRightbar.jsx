import "./rightbar.css";
import FriendsList from "../FriendsList/FriendsList";
import { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import cloneDeep from 'lodash.clonedeep';
import { AuthContext } from "../../context/AuthContext";
import TextField from "@mui/material/TextField";

export default function ProfileRightbar({ user }) {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  // const [user, setUser] = useState(JSON.parse(JSON.stringify(profileUser)));
  // const [user, setUser] = useState(cloneDeep(profileUser));
  const [followed, setFollowed] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const about = useRef();
  const from = useRef();
  const city = useRef();
  const school = useRef();

// useEffect(() => {
//   if(user._id === currentUser._id){
//     setUser(currentUser);
//   }
// }, [currentUser]);

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

  const handleProfileEdit = async () => {
    setIsEdit(true);
  };
  const handleSave = async () => {
    let updateFields = {
      desc: about.current.value,
      from: from.current.value,
      city: city.current.value,
      school: school.current.value,
      userId: user._id,
    };
    const formData = new FormData();
    formData.append("desc", about.current.value);
    formData.append("from", from.current.value);
    formData.append("city", city.current.value);
    formData.append("school", school.current.value);
    formData.append("userId", user._id);
    try {
      const response = await fetch(`/users/${currentUser._id}`, {
        method: "PUT",
        body: JSON.stringify(updateFields),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response) {
        const data = await response.json();
        dispatch({ type: "UPDATEUSER", payload:data} );
      } else {
        console.log("some prblem", response);
      }
    } catch (error) {
      console.log("some prblem server error", error);
    }
    setIsEdit(false);
  };

  // console.log("user", user);
  // console.log("prof user", profileUser);
  // console.log("currentuser", currentUser);

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user._id !== currentUser._id ? (
          <button className="rightbarFollowButton" onClick={handleFollow}>
            {followed ? "Unfollow" : "Follow"}
          </button>
        ) : (
          <button onClick={handleProfileEdit}>Edit Profile</button>
        )}
        <br />
        <br />
        <h4 className="rightbarTitle">About {user.username}</h4>
        <span className="rightbarInfoKey">
          Few words about {user.username}:
        </span>
        {isEdit ? (
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue={user.desc}
            variant="filled"
            size="small"
            inputRef={about}
          />
        ) : (
          <span className="rightbarInfoValue">{user.desc}</span>
        )}
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            {isEdit ? (
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue={user.city}
                variant="filled"
                size="small"
                inputRef={city}
              />
            ) : (
              <span className="rightbarInfoValue">{user.city}</span>
            )}
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            {isEdit ? (
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue={user.from}
                variant="filled"
                size="small"
                inputRef={from}
              />
            ) : (
              <span className="rightbarInfoValue">{user.from}</span>
            )}
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">School/Work:</span>
            {isEdit ? (
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue={user.school}
                variant="filled"
                size="small"
                inputRef={school}
              />
            ) : (
              <span className="rightbarInfoValue">{user.school}</span> 
            )}
          </div>
          {isEdit ? (
            <div className="editButtons">
              {" "}
              <button onClick={() => setIsEdit(false)}>Back</button>{" "}
              <button onClick={handleSave}>Save</button>{" "}
            </div>
          ) : (
            <span />
          )}
        </div>
        <h4 className="rightbarTitle">{user.username}'s friends</h4>
        <ul className="rightbarFriendList">
          <FriendsList user={user} />
        </ul>
      </div>
    </div>
  );
}
