import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { DataLayer } from './DataLayer';
import reducer, { initialState } from './reducer';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import TopArtists from './pages/TopArtists';
import UserPlaylists from './pages/UserPlaylists';
import MixarPlaylists from './pages/MixarPlaylists';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>
      
      <DataLayer initialState={initialState} reducer={reducer}>
        
        <Routes>
    
        
          <Route path="/" element={<Home />}>
            <Route path="/" element={<TopArtists />} />
            <Route path="/playlists" element={<UserPlaylists />} />
            <Route path="/mixar" element={<MixarPlaylists />} />
          </Route>

        </Routes>

      </DataLayer>

    </BrowserRouter>

  </React.StrictMode>
);
