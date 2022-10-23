import React from 'react'
import './Box.css'

function Playlist({name, image}) {
  return (

    <div className='select'>

      <div className="box">

          <img src={image}></img>

          <h3>{name}</h3>
        </div>
    </div>
  )
}
export default Playlist