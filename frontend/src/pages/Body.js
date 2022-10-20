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

  console.log("Received top artists:", data)

  return data;
}

function Body() {
  const [{ top_artists }, dispatch] = useDataLayerValue();
  const top_artist_list = getTopArtists();

  return (
    <div className="body">
        <div className="top-artists-container">
          { top_artist_list?.items?.map(artist => (
            <Artist name={artist.name} image={artist.images[0].url}/>
          ))}
        </div>
    </div>
  )
}

export default Body
