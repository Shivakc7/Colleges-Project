import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function Share() {
  const { user } = useContext(AuthContext);
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.image = fileName;
      console.log(newPost)
      try {
        await axios.post("/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      axios.post("/api/posts", newPost);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="share">
      <div className="share-wrapper">
        <div className="share-top">
          <img
            src={
              user.profilePicture
                ? publicFolder + user.profilePicture
                : publicFolder + "/person/nabin.jpg"
            }
            alt=""
            className="share-img"
          />
          <input
            type="text"
            placeholder={"What's in your mind " + user.username + "?"}
            className="share-input"
            ref={desc}
          />
        </div>
        <hr className="share-hr" />
        {
          file && (
            <div className="share-img-container">
              <img src={URL.createObjectURL(file)} alt="" className="share-img-show" />
              <Cancel className="share-cancel-img" onClick ={() => setFile(null)} />
            </div>
          )
        }
        <form className="share-bottom" onSubmit={handleSubmit}>
          <div className="share-options" >
            <label htmlFor="file" className="share-option">
              <PermMedia htmlColor="tomato" className="share-icon" />
              <span className="share-options-text">photo or video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="share-option">
              <Label htmlColor="blue" className="share-icon" />
              <span className="share-options-text">Tag</span>
            </div>
            <div className="share-option">
              <Room htmlColor="green" className="share-icon" />
              <span className="share-options-text">Location</span>
            </div>
            <div className="share-option">
              <EmojiEmotions htmlColor="goldenrod" className="share-icon" />
              <span className="share-options-text">Feelings</span>
            </div>
          </div>
          <button type="submit" className="share-btn">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
