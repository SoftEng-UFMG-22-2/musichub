import React from 'react';
import { useDataLayerValue } from '../DataLayer';
import './TopSongs.css'
import Artist from './components/Artist'

const getTopSongs = async () => {
  const requestOptions = {
    method: "GET",
  };

  const response = await fetch("http://localhost:8000/api/topsongs", requestOptions)
  const data = await response.json();

  return data;
}

function TopSongs() {
  const [{ top_Songs }, dispatch] = useDataLayerValue();
  const placeholder_link = "https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg"

  return (
    <div className="body">
        <div className="top-songs-container">
          <h2>Seus músicas mais ouvidas: </h2>
          {/* {
            top_songs? (Object.entries(top_songs)?.map(([artist, url]) => (
              <Artist name={artist} image={url} />
            ))) :
            Array.from(
              { length: 10 },
              (_, i) => (
                <Artist name={"Loading..."} image={placeholder_link} />
              )
            )

          } */}
        </div>
    </div>
  )
}

export default TopSongs;
