import "./leftbar.css";
import {
  RssFeed,
  Message,
  PlayCircle,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@mui/icons-material";
import {Users} from '../../data'
import Friend from "../friend/Friend";

function Leftbar() {
  return (
    <div className="leftbar">
      <div className="leftbar-wrapper">
        <ul className="leftbar-list">
          <li className="leftbar-list-item">
            <RssFeed className="leftbar-icon" />
            <span className="leftbar-list-item-text">Feed</span>
          </li>
          <li className="leftbar-list-item">
            <Message className="leftbar-icon" />
            <span className="leftbar-list-item-text">Chats</span>
          </li>
          <li className="leftbar-list-item">
            <PlayCircle className="leftbar-icon" />
            <span className="leftbar-list-item-text">Video</span>
          </li>
          <li className="leftbar-list-item">
            <Group className="leftbar-icon" />
            <span className="leftbar-list-item-text">Groups</span>
          </li>
          <li className="leftbar-list-item">
            <Bookmark className="leftbar-icon" />
            <span className="leftbar-list-item-text">Bookmarks</span>
          </li>
          <li className="leftbar-list-item">
            <HelpOutline className="leftbar-icon" />
            <span className="leftbar-list-item-text">Questions</span>
          </li>
          <li className="leftbar-list-item">
            <WorkOutline className="leftbar-icon" />
            <span className="leftbar-list-item-text">Jobs</span>
          </li>
          <li className="leftbar-list-item">
            <Event className="leftbar-icon" />
            <span className="leftbar-list-item-text">Events</span>
          </li>
          <li className="leftbar-list-item">
            <School className="leftbar-icon" />
            <span className="leftbar-list-item-text">Courses</span>
          </li>
        </ul>
        <button className="leftbar-btn">Show More</button>
        <hr className="leftbar-hr" />
        <ul className="leftbar-friend-list">
          {Users.map((user) =>  {
            return <Friend key={user.id} user={user} />
          }) }       
        </ul>
      </div>
    </div>
  );
}

export default Leftbar;
