import React from 'react';
import './Home.css';
import Sidebar from './components/Sidebar';
import Body from './Body';
import Statistics from './Statistics'
import Playlists from './Playlists';
import { Routes, Route, Link } from 'react-router-dom';

function Home({ spotify }) {
  return (
      <div className="home">
          <div className="home-body">
            <Sidebar />
            
            <Routes>
              <Route path="/" element={<Body/>} />
              <Route path="playlists" element={<Playlists/>} />
              <Route path="stats" element={<Statistics/>} />
            </Routes>
  

          </div>
      </div>

  );
}

export default Home;