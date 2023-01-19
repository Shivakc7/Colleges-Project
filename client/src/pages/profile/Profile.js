import "./profile.css";
import Feed from "../../components/feed/Feed";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import TopNavBar from "../../components/TopNavBar/topNavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from "react-router"

function Profile() {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER
  const [users, setUsers] = useState({})
  const username = useParams().username

  useEffect(() => {
    const fetchUser = async() => {
      const res = await axios.get(`/api/users?username=${username}`)
      setUsers(res.data)

    }
    fetchUser()
  },[username])   

  return (
    <>
      <TopNavBar />
      <div className="profile">
        <Leftbar />
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
              <img
                className="profile-coverImg"
                src={users.coverPicture || publicFolder + "person/coverPicture.jpg"}
                alt=""
              />
              <img
                className="profile-userImg"
                src={users.profilePicture || publicFolder + "person/nabin.jpg"}
                alt=""
              />
            </div>
            <div className="profile-info">
                <h4 className="profile-info-name"> {users.username}</h4>
                <span className="profile-info-desc"> {users.desc}</span>

            </div>
          </div>
          <div className="profile-right-bottom">
            <Feed username={username} />
            <Rightbar users={users} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
