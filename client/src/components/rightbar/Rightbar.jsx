import "./rightbar.css";
import FriendsList from "../FriendsList/FriendsList";
import { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({ user }) {
  const { user: currentUser} = useContext(AuthContext);
  
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <img className="rightbarAd" src="assets/ad.jpeg" alt="" />
        <h4 className="rightbarTitle">My Friends</h4>
        <ul className="rightbarFriendList">
          <FriendsList user={currentUser}/>
        </ul>
      </div>
    </div>
  );
}
