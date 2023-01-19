import './online.css'

function Online({user}) {
    const {id,profilePicture, username} = user
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER


  return (
    <li key={id} className="rightbar-friend">
  <div className="rightbar-profile-container">
    <img src={publicFolder + profilePicture} alt="" className="rightbar-profile-img" />
    <span className="rightbar-online"></span>
  </div>
  <span className="rightbar-username">{username}</span>
</li>
  
  )
}

export default Online