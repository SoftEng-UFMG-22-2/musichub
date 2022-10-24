import React from 'react'
import './HorizontalBox.css'


function Playlist({name, image}) {
  return (
    <div className="horizontalbox">

        <img src={image}></img>

        <h3>{name}</h3>
</div>
  )
}

export default Playlist