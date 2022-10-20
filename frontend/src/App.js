import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './pages/Login'
import Home from './pages/Home'
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js'
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebApi();

const isLoggedIn = async () => {
  const requestOptions = {
    method: "GET",
  };

  const response = await fetch("http://localhost:8000/api/isloggedin", requestOptions)
  const loggedin = await response.json();
  console.log("here!",loggedin);
  return loggedin;
}

function App() {
  const [{ logged }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;



    if (_token) {
      //logged=true;
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.setAccessToken(_token);

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

      spotify.getMyTopArtists().then((artists) => {
        dispatch({
          type: 'GET_TOP_ARTISTS',
          top_artists: artists,
        });
      });
    }

    // Only being used down here
    let _logged = isLoggedIn()
    if (_logged) {
      dispatch({
        type: "SET_LOGGED",
        logged: _logged,
      });
    }

  }, []);

  console.log(logged ? "Logged 🤠" : "Not logged 👽");

  return (
    <div className="App">
      <header className="App-header">
        {
          logged ? (
            <Home spotify={spotify}/>
          ) : (
            <Login />
          )
        }

      </header>
    </div>
  );
}

export default App;
