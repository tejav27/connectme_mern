import "./sidebar.css";
import {
  RssFeed,
  Chat,
  Group,
} from "@material-ui/icons";
import SuggestedFriends from "../SuggestedFriends/SuggestedFriends";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function Sidebar() {
  const { user } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to="/" style={{ textDecoration: "none", color:'black' }}>
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          </Link>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          <p className="sidebarFriendsListHeading">Suggested Friends</p>
            <SuggestedFriends user = {user}/>
        </ul>
      </div>
    </div>
  );
}
