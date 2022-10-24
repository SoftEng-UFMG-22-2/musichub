import React, { useState } from 'react';
import axios from 'axios';
import { useDataLayerValue } from '../DataLayer';
import Playlist from './components/Playlist'
import SendButton from './components/SendButton';

import './MixarPlaylists.css'
import './TopArtists.css'

const postPlaylist = async (data) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data)
  };

  //const response = await fetch("http://localhost:8000/api/create-mix-playlist", requestOptions)
  const response = await axios.post("http://localhost:8000/api/create-mix-playlist", data)
  //const data = await response.json();

  //return data;
}


const handleButton = async (state) => {
  postPlaylist(state);
}


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
      <div className="top-container">
      <h2>Selecione artistas para compor uma nova playlist: </h2>
      <div onClick={() => {handleButton(state)}}>
      <SendButton />
      </div>
      </div>
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
