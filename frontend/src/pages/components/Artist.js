import React from 'react'
import './Artist.css'


function Artist({name, image}) {
  return (
    <div className="artist-box">
      
        <img src={image}></img>
    
        <h3>{name}</h3>
</div>
  )
}

export default Artist