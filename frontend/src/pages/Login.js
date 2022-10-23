import React from 'react';
import './Login.css';

import logo from '../assets/logo-login.png';
import SpotifyLogo from '../assets/spotify_logo.png';

import { Button } from '@material-ui/core';

const startSpotifySession = async () => {
  const requestOptions = {
    method: "GET",
  };

  const response = await fetch("http://localhost:8000/api/start", requestOptions)
  const data = await response.json();

  return data;
}

const redirectToAuthPage = async (spotify) => {
  spotify.login().then((_url) => { window.location.href = _url })
}

const handleLoginButton = (spotify) => {
  // Starts a new Spotify Session and redirects to Spotify Auth page
  redirectToAuthPage(spotify);
}

function Login(spotify) {
  return (
    <div className="login" >
        {/* MusicHub Logo */}
        <div className="login-container">
          <img src="https://i.postimg.cc/J41rgGM4/logo-login.png" alt="MusicHub logo" className="login-logo" />
          <div className="login-text">
            <p className='login-text-top'>MusicHub é um web app que lhe permite explorar os dados de sua conta no spotify. Descubra seus artistas e músicas favoritos ou crie playlists customizadas.</p>

            <p>Para começar, entre com sua conta através do botão abaixo!</p>
          </div>
          <div className="login-button-wrapper">
            <Button
                style={{
                    borderRadius: 35,
                    backgroundColor: "#1DB954",
                    padding: "12px 24px",

                    fontSize: "16px",
                    color: "white"
                }}
                className="login-button"
                variant="outlined"
                size="large"
                onClick={() => {
                  handleLoginButton(spotify);
                }}
            >
            <img src={SpotifyLogo} alt="Spotify logo" className="button-icon" height="auto" width="30vw" />
              Entrar com o Spotify
            </Button>
          </div>
          
        </div>
    </div>
  )
}

export default Login
