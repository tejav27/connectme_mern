import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import ProfileRightbar from "../../components/rightbar/ProfileRightbar";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  const { user: loggedInUser, updateUser, usergpt } = useContext(AuthContext);
  const [userChanged, setUserChanged] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [userChanged]);

  const fileInputRef = useRef(null);
  const fileCoverInputRef = useRef(null);

  const handleUpdateUser = () => {
    // Perform necessary actions to update the user data
    const newUserData = { name: "John Doe", email: "john@example.com" };
    updateUser(newUserData);
  };

  const handlePictureClick = () => {
    if (loggedInUser._id === user._id) {
      fileInputRef.current.click();
    }
  };
  const handleCoverPictureClick = () => {
    if (loggedInUser._id === user._id) {
      fileCoverInputRef.current.click();
    }
  };
  const handleCoverPictureUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("coverPicture", file);

    try {
      const response = await fetch(
        `/users/${loggedInUser._id}/uploadCoverPic`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (response.ok) {
        setUserChanged(!userChanged);
        handleUpdateUser(response.data);
        console.log("file uploaded successfully", response);
        console.log("usergpttttt", usergpt);
      } else {
        console.log("some prblem", response);
      }
    } catch (error) {
      console.log("some prblem server error", error);
    }
  };
  const handlePictureUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const response = await fetch(`/users/${loggedInUser._id}/uploadProfPic`, {
        method: "PUT",
        body: formData,
      });
      if (response.ok) {
        setUserChanged(!userChanged);
        console.log("file uploaded successfully", response);
      } else {
        console.log("some prblem", response);
      }
    } catch (error) {
      console.log("some prblem server error", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <div>
                <img
                  className="profileCoverImg"
                  src={
                    user.coverPicture
                      ? PF + "coverPic/" + user.coverPicture
                      : PF + "person/backgroundpic.jpeg"
                  }
                  alt=""
                  onClick={handleCoverPictureClick}
                />
                {loggedInUser._id === user._id ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverPictureUpload}
                    ref={fileCoverInputRef}
                    style={{ display: "none" }}
                  />
                ) : (
                  <div />
                )}
                <div />
              </div>
              <div className="profilePic">
                <img
                  title="Upload/Edit Profile Picture"
                  className="profileUserImg"
                  src={
                    user.profilePicture
                      ? PF + "profilePic/" + user.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  onClick={handlePictureClick}
                />
                {loggedInUser._id === user._id ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePictureUpload}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                  />
                ) : (
                  <div />
                )}
              </div>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <ProfileRightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
