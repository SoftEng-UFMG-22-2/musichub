import React from 'react'
import './Playlist.css'

function Playlist({name, image}) {
  return (
    <div className="playlist-box">
        <img src={image}></img>
        <h3>{name}</h3>
    </div>
  )
}

export default Playlist