import "./topbar.css";
import { Search, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({type:"LOGOUT"});
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">ConnectMe</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for a friend or post...!"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="topbarLink">Homepage</span>
        </Link>
          <div className="topbarIconItem">
            <Chat />
          </div>
          <div className="topbarIconItem">
            <Notifications />
          </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
              ? PF + "profilePic/" + user.profilePicture
              : PF + "person/defaultProfPic.png"
            }
            alt=""
            className="topbarImg"
            title={user.username}
          />
        </Link>
          <div className="topbarIconItem">
            <button onClick={handleLogout}>Logout</button>
          </div>
      </div>
      </div>
  );
}
