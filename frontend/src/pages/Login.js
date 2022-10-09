import React from 'react';
import './Login.css';
import logo from '../assets/logo.png';
import { Button } from '@material-ui/core';
import config from '../config';

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
                href={`${config.backendUrl}/login`}
            >
            LOGIN WITH SPOTIFY
            </Button>
            {/* Login button */}
        </div>
    </div>
  )
}

export default Login