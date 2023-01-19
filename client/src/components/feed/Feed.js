import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
// import { Posts } from "../../data";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext)
 
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = username
          ? await axios.get("/api/posts/profile/" + username)
          : await axios.get("/api/posts/timeline/" + user._id);
        setPosts(res.data.sort((p1,p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        }));
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchPost();
  }, [username, user._id]);
  return (
    <div className="feed">
      <div className="feed-wrapper">
      {(!username || username === user.username) && <Share />}
       
      
        {posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
}

export default Feed;
