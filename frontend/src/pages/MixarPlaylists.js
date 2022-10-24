import React from 'react';
import { useDataLayerValue } from '../DataLayer';
import Playlist from './components/Playlist'

import './MixarPlaylists.css'


const togglePlaylistSelected = () => {

}

const renderPlaylists = (playlist_name, url) => {
  return <div onClick={() => { togglePlaylistSelected(playlist_name); }}>

        </div>
}

function MixarPlaylists() {
  const [{ playlists }, dispatch] = useDataLayerValue();
  const placeholder_link = "https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg"

  //const state = {
  //  playlists: [...Object.entries(playlists).map(playlist => { return { ...playlist[0], selected : false } } )]
  //}


  return (
    <div className="playlists-body">
        <div className="playlists-container">
          <h2>Selecione playlists para mixar: </h2>

          {
          playlists ? (Object.entries(playlists)?.map(([playlist_name, url]) => (
            <Playlist name={playlist_name} image={url} />
          ))) :
            //return renderPlaylists(playlist_name, url, idx)
          //))
          //  :

          Array.from({ length: 10 },(_, i) => (
                <Playlist name={"Loading..."} image={placeholder_link} />))
          }

        </div>
    </div>
  )
}

export default MixarPlaylists
