import React from 'react';
import { useDataLayerValue } from '../DataLayer';
import './TopArtists.css'
import Artist from './components/Artist'


function MixarPlaylists() {
  const [{ playlists }, dispatch] = useDataLayerValue();
  const placeholder_link = "https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg"

  return (
    <div className="body">
        <div className="playlists-container">
          <h2>Algumas de suas playlists: </h2>
          {
            playlists? (Object.entries(playlists)?.map(([playlist, url]) => (
              <Artist name={playlist} image={url} />
            ))) :
            Array.from(
              { length: 10 },
              (_, i) => (
                <Artist name={"Loading..."} image={placeholder_link} />
              )
            )

          }
        </div>
    </div>
  )
}

export default MixarPlaylists