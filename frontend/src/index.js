import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { DataLayer } from './DataLayer';
import reducer, { initialState } from './reducer';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PageLayout from './pages/PageLayout';
import TopArtists from './pages/TopArtists';
import TopTracks from './pages/TopTracks';
import CreatePlaylist from './pages/CreatePlaylist';
import MixarPlaylists from './pages/MixarPlaylists';
import Home from './pages/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>
      
      <DataLayer initialState={initialState} reducer={reducer}>
        
        <Routes>
    
        
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />}>
              <Route path="artistas" element={<TopArtists />}/>
              <Route path="musicas" element={<TopTracks />}/>
            </Route>
            <Route path="/playlists" element={<CreatePlaylist />} />
            <Route path="/mixar" element={<MixarPlaylists />} />
            <Route path="/logout" element={<MixarPlaylists />} />
          </Route>

        </Routes>

      </DataLayer>

    </BrowserRouter>

  </React.StrictMode>
);
