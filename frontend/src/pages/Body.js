import React from 'react';
import { useDataLayerValue } from '../DataLayer';
import './Body.css'
import Artist from './components/Artist'

const getTopArtists = async () => {
  const requestOptions = {
    method: "GET",
  };

  const response = await fetch("http://localhost:8000/api/topartists", requestOptions)
  const data = await response.json();

  return data;
}

function Body() {
  const [{ top_artists }, dispatch] = useDataLayerValue();
  const placeholder_link = "https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg"

  return (
    <div className="body">
        <div className="top-artists-container">
          {
            top_artists? (Object.entries(top_artists)?.map(([artist, url]) => (
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

export default Body
