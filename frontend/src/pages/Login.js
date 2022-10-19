import React from 'react';
import './Login.css';
import logo from '../assets/logo.png';
import { Button } from '@material-ui/core';
import config from '../config';
import { loginUrl } from '../spotify'



const startSpotifySession = async () => {
  const requestOptions = {
    method: "GET",
  };

  const response = await fetch("http://localhost:8000/start", requestOptions)
  const data = await response.json();

  return data;
}

const redirectToAuthPage = async () => {
  window.location.href = await startSpotifySession();
}

const handleLoginButton = () => {
  // Starts a new Spotify Session and redirects to Spotify Auth page
  redirectToAuthPage();
}

function Login() {
  return (
    <div className="login" >
        {/* MusicHub Logo */}
        <div classname="login-container">
            <img src={logo} alt="MusicHub logo"/>
            <Button
                style={{
                    borderRadius: 35,
                    backgroundColor: "#1DB954",
                    padding: "18px 36px",
                    fontSize: "18px",
                    color: "white"
                }}
                variant="outlined"
                size="large"
                onClick={() => {
                  handleLoginButton();
                }}
            >
            LOGIN WITH SPOTIFY
            </Button>
            {/* Login button */}
        </div>
    </div>
  )
}

export default Login
