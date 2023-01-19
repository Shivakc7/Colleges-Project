import { useContext } from "react";
import "./topNavBar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function topNavBar() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useContext(AuthContext);

  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Social media</span>
        </Link>
      </div>
      <div className="topbar-center">
        <div className="search-bar">
          <Search className="search-icon" />
          <input type="text" className="search-input" />
        </div>
      </div>
      <div className="topbar-right">
        <div className="topbar-links">
          <span className="topbar-link">Homepage</span>
          <span className="topbar-link">Timeline</span>
        </div>
        <div className="topbar-icons">
          <div className="topbar-icons-list">
            <Person />
            <span className="topbar-icons-badge">1</span>
          </div>
          <div className="topbar-icons-list">
            <Chat />
            <span className="topbar-icons-badge">2</span>
          </div>
          <div className="topbar-icons-list">
            <Notifications />
            <span className="topbar-icons-badge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? publicFolder + user.profilePicture
                : publicFolder + "/person/nabin.jpg"
            }
            alt="profile"
            className="profile-img"
          />
        </Link>
      </div>
    </div>
  );
}

export default topNavBar;
