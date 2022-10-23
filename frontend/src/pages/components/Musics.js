import React from 'react'
import './Artist.css'


function Music({name, image,author}) {
  return (
    <div className="artist-box">
      
        <img src={image}></img>
        <h3>{author} - {name}</h3>
</div>
  )
}

export default Artist