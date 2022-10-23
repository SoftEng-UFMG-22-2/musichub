import React from 'react';
import { useDataLayerValue } from '../DataLayer';
import Artist from './components/Artist'

import './MixarPlaylists.css'



const renderPlaylists = (playlist, url) => {
  return <div onClick> <Artist name={playlist} image={url} /> </div>
}

function MixarPlaylists() {
  const [{ playlists }, dispatch] = useDataLayerValue();
  const placeholder_link = "https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg"

  //const state = {
  //  playlists : [...playlists.map( artist)]
  //}

  return (
    <div className="playlists-body">
        <div className="playlists-container">
          <h2>Selecione playlists para mixar: </h2>
          
          {
          playlists ? (Object.entries(playlists)?.map(([playlist, url]) => {
            return renderPlaylists(playlist, url)
          }))
            :
          
          Array.from({ length: 10 },(_, i) => (
                <Artist name={"Loading..."} image={placeholder_link} />))
          }

        </div>
    </div>
  )
}

export default MixarPlaylists