
import React, { useState } from 'react';
import { useDataLayerValue } from '../DataLayer';
import './TopArtists.css'
import './CreatePlaylist.css'
import Playlist from './components/Playlist'


export default function CreatePlaylist() {
  const [{ top_artists }, dispatch] = useDataLayerValue();

  const placeholder_link = "https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg"

  const [state, setState] = useState(top_artists
                                            ?
                                              Object.assign({}, ...Object.entries(top_artists).map(([k, _]) => ({ [k]: false })))
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
          top_artists ? (Object.entries(top_artists)?.map(([playlist_name, url]) => (
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
