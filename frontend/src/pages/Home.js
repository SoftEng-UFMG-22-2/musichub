import React from 'react';
import './Home.css';
import Sidebar from './components/Sidebar';
import TopArtists from './TopArtists';
import Statistics from './Statistics'
import UserPlaylists from './UserPlaylists';
import { Routes, Route, Link } from 'react-router-dom';

function Home({ spotify }) {
  return (
      <div className="home">
          <div className="home-body">
            <Sidebar />
            <Routes>
              <Route path="/" element={<TopArtists/>} />
              <Route path="playlists" element={<UserPlaylists/>} />
              <Route path="stats" element={<Statistics/>} />
            </Routes>
  

          </div>
      </div>

  );
}

export default Home;