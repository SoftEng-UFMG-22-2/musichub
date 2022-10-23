import React from 'react';
import { useDataLayerValue } from '../DataLayer';
import './TopArtists.css'
import Artist from './components/Artist'


function TopArtists() {
  const [{ top_artists }, dispatch] = useDataLayerValue();
  const placeholder_link = "https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg"

  return (
    <div className="body">
          <h2>Seus artistas mais ouvidos: </h2>
        <div className="top-artists-container">
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

export default TopArtists;
