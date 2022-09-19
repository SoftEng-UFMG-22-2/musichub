import React from 'react';
import { Button } from '@material-ui/core';
import config from './config';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to MusicHub prototype Login Page
        </p>
        <Button
						disabled={false}
						size="large"
						variant="outlined"
            href={`${config.backendUrl}/login`}
					>
          Login com o Spotify
				</Button>
      </header>
    </div>
  );
}

export default App;
