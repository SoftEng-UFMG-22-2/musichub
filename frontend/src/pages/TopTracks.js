import React from 'react';
import { useDataLayerValue } from '../DataLayer';
import './TopTracks.css'
import Artist from './components/Artist'

function TopTracks() {
  const [{ top_tracks }, dispatch] = useDataLayerValue();
  const placeholder_link = "https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg"

  return (
    <div className="body">
        <div className="top-songs-container">
          <h2>Suas músicas mais ouvidas: </h2>
          {
            top_tracks? (Object.entries(top_tracks)?.map(([artist, url]) => (
              <Artist name={artist} image={url} />
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

export default TopTracks;
