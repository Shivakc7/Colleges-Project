import './friend.css'

import React from 'react'

function Friend({user}) {
    const {profilePicture, username} = user
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <li className="leftbar-friend">
            <img
              src={publicFolder + profilePicture}
              alt="friend-profile"
              className="leftbar-friend-img"
            />
            <span className="leftbar-friend-name">{username}</span>
          </li>  
  )
}

export default Friend