import './App.css';

import React, { useEffect, useState } from 'react';
import { useDataLayerValue } from './DataLayer';

import Login from './pages/Login'
import Home from './pages/Home'

import SpotifyApi from './spotify';
//import SpotifyWebApi from 'spotify-web-api-js'

const spotify = new SpotifyApi();

function App() {

  const [{ logged, top_artists }, dispatch] = useDataLayerValue();

  useEffect(() => {

    spotify.isLoggedIn().then(_logged => {
      dispatch({
        type: 'SET_LOGGED',
        logged: _logged,
      });
      if (_logged) {
        spotify.getMe().then(user => {
          dispatch({
            type: 'SET_USER',
            user: user,
          });
        });

        spotify.getUserPlaylists().then((playlists) => {
          dispatch({
            type: 'SET_PLAYLISTS',
            playlists: playlists,
          });
        });
        console.log("Start get top artists");
        spotify.getTopArtists().then((artists) => {
          console.log("Getting artists", artists);
          dispatch({
            type: 'GET_TOP_ARTISTS',
            top_artists: artists,
          });
        });

        console.log("End get top artists");
      }
    });
  }, []);

  console.log(logged==true ? "Logged 🤠" : "Not logged 👽", "(logged is", logged, ")");

  return (
    <div className="App">
      <header className="App-header">
        {
          logged==false ? <Login /> : <Home spotify={spotify} />
        }
      </header>
    </div>
  );
}

export default App;
