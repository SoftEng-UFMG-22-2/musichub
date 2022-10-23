import React from 'react'
import './Box.css'


function Artist({name, image}) {
  return (
    <div className="box">
      
        <img src={image}></img>
    
        <h3>{name}</h3>
</div>
  )
}

export default Artist