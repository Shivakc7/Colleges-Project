  import "./rightbar.css";
import { Users } from "../../data";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

function Rightbar({ users }) {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([])
  const {user, dispatch} = useContext(AuthContext)
  const [followed, setFollowed] = useState(user.followings.includes(users?.id))
  // console.log(user.following.includes(users?.id))
  // console.log(user.username)

 
  useEffect(() => {
    const fetchFriends = async() => {
      try {
        const friendList = await axios.get("/api/users/friends/" + users._id)
        setFriends(friendList.data)
        
      } catch (error) {
        console.log(error)
      }
    } 
    fetchFriends()
  },[users])

  

  const handleClick = async() => {
      try {
        if(followed){
          await axios.put("/api/users/"+users._id+"/unfollow", {userId: user._id})
          dispatch({type: "UNFOLLOW", action: user._id})
        }else{
          await axios.put("/api/users/"+users._id+"/follow", {userId: user._id})
          dispatch({type: "FOLLOW", action: user._id})

        }
      } catch (error) {
        console.log(error)
      }
      setFollowed(!followed)
  }

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthday-container">
          <img
            className="birthday-img"
            src="/assests/person/Boris-Johnson.jpg"
            alt=""
          />
          <span className="birthday-text">
            <b>Boris Johnson </b> and <b> 3 others</b> have birthday today
          </span>
        </div>
        <img
          className="rightbar-ad"
          src={`${publicFolder}person/Boris-Johnson.jpg`}
          alt=""
        />
        <h4 className="rightbar-title">Online Friends</h4>
        <ul className="rightbar-friendlist">
          {Users.map((user) => {
            return <Online key={user.id} user={user} />;
          })}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {

    return (
      <>
        {users.username !== user.username && (
          <button className="rightbar-follow-btn" onClick={handleClick}>
            {followed? "Unfollow": "Follow"}
            {followed? <Remove />: <Add />}

           
          </button>
        )}

      
        <h4 className="rightbar-user-title">User information </h4>
        <div className="rightbar-info">
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">City:</span>
            <span className="rightbar-info-value">{users.city}</span>
          </div>
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">From:</span>
            <span className="rightbar-info-value">{users.from}</span>
          </div>
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">Relationship:</span>
            <span className="rightbar-info-value">
              {users.relationship === 1
                ? "Single"
                : users.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbar-user-title">User Friends </h4>
        <div className="rightbar-followings">
          {friends.map((friend) => {
            return (
              <Link key={friend._id}
                to={"/profile/" + friend.username}
                style={{ textDecoration: "none" }}
                
              >
                <div className="rightbar-following" >
                  <img
                    className="rightbar-following-img"
                    src={
                      friend.profilePicture
                        ? publicFolder + friend.profilePicture
                        : publicFolder + "person/barack-obama.jpg"
                    }
                    alt=""
                  />
                  <span className="rightbar-following-name">
                    {friend.username}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbar-wrapper">
        {users ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

export default Rightbar;
