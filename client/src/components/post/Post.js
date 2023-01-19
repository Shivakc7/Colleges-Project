import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const {user: currentUser} = useContext(AuthContext)

  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id))
  },[currentUser._id, post.likes])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users?userId=${post.userId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [post.userId]);
  const likeHandler = () => {
    try {
      axios.put("api/posts/" +post._id+"/like", {userId: currentUser._id })
    } catch (error) {
     
    }
    if (isLiked) {
      setLike(like - 1);
    } else {
      setLike(like + 1);
    }
    // setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked);
   
  };
  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-top-left">
            <Link to={`profile/${user.username}`} >
              <img
                className="post-profile"
                src={user.profilePicture ? publicFolder +  user.profilePicture : publicFolder + "person/nabin.jpg"}
                alt="Profile"
              />
            </Link>
            <span className="post-username">{user.username}</span>
            <span className="post-date">{format(post.createdAt)}</span>
          </div>
          <div className="post-top-right">
            <MoreVert />
          </div>
        </div>
        <div className="post-center">
          <span className="post-text">{post.desc}</span>
          <img
            className="post-img"
            src={post.image ? publicFolder + post.image : publicFolder + "person/coverImage.jpg"}
            alt="hello"
          />
        </div>
        <div className="post-bottom">
          <div className="post-bottom-left">
            <img
              className="like-icon"
              src={`${publicFolder}Like.png`}
              alt=""
              onClick={likeHandler}
            />
            <img
              className="like-icon"
              src={`${publicFolder}heart.png`}
              alt=""
              onClick={likeHandler}
            />
            <span className="post-like-counter">{like} people like it</span>
          </div>
          <div className="post-bottom-right">
            <span className="post-comment-text">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
