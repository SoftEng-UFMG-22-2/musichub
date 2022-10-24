import React, { useState } from 'react';
import { useDataLayerValue } from '../DataLayer';
import Playlist from './components/Playlist'

import './MixarPlaylists.css'
import './TopArtists.css'




export default function MixarPlaylists() {
  const [{ playlists }, dispatch] = useDataLayerValue();

  const placeholder_link = "https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg"

  const [state, setState] = useState(playlists
                                            ?
                                              Object.assign({}, ...Object.entries(playlists).map(([k, _]) => ({ [k]: false })))
                                            :
                                              {});

  const[list, setList] = useState([])

  const toggleArtistSelected = (artist) => {
    const nState = state;
    nState[artist] = !nState[artist];
    setState(nState);
    setList([])
    console.log(state);
  };
  return (
    <div className="body-playlist">
      <h2>Selecione artistas para compor uma nova playlist: </h2>
      <div className="playlists-container">
        {
          playlists ? (Object.entries(playlists)?.map(([playlist_name, url]) => (
            <div onClick={() => { toggleArtistSelected(playlist_name); }}>
              <div className={state[playlist_name]?"selected":"not-selected"}>
                <Playlist name={playlist_name} image={url} />
              </div>
            </div>
          ))) :
          Array.from(
            { length:10 },
            (_, i) => (
              <Playlist name={"Loading..."} image={placeholder_link} />
            )
          )
        }
      </div>
    </div>

  )
}
