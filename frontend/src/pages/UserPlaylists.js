import React from 'react';
import { useDataLayerValue } from '../DataLayer';
import './TopArtists.css'
import Playlist from './components/Playlist'

const getUserPlaylists = async () => {
  const requestOptions = {
    method: "GET",
  };

  const response = await fetch("http://localhost:8000/api/playlists", requestOptions)
  const data = await response.json();

  return data;
}

function UserPlaylists() {
  const [{ user_playlists }, dispatch] = useDataLayerValue();
  const placeholder_link = "https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg"

  return (
    <div className="userplaylist, body">
        <div className="user-playlists-container">
          {
            user_playlists? (Object.entries(user_playlists)?.map(([playlist, url]) => (
              <Playlist name={playlist} image={url} />
            ))) :
            Array.from(
              { length: 10 },
              (_, i) => (
                <Playlist name={"Loading..."} image={placeholder_link} />
              )
            )

          }
          
        </div>
    </div>
  )
}

export default UserPlaylists
