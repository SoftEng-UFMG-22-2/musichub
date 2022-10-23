import React from 'react';
import { useDataLayerValue } from '../DataLayer';
import './TopArtists.css'
import './CreatePlaylist.css'
import Artist from './components/Artist'


function CreatePlaylist() {
  const [{ top_artists }, dispatch] = useDataLayerValue();
  const placeholder_link = "https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg"

  return (
    <div className="body">
        <div className="top-artists-container">
          <h2>Selecione artistas para compor uma nova playlist: </h2>
          {
            top_artists? (Object.entries(top_artists)?.map(([artist, url]) => (
              <Artist name={artist} image={url} />
            ))) :
            Array.from(
              { length:10 },
              (_, i) => (
                <Artist name={"Loading..."} image={placeholder_link} />
              )
            )

          }
        </div>
    </div>
  )
}

export default CreatePlaylist