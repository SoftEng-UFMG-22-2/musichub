import React from 'react'
import './Artist.css'

function Artist({name, image}) {
  return (
    <div class = "top_card">
    <div class = "top_card_number"><h1>1</h1>
    </div>

    <div class = "top_card_imagebox">
        
        <img src={image}> </img>   
    </div>
    <p>{name}</p>
</div>
  )
}

export default Artist