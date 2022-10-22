import React from 'react';
import './Home.css';
import Sidebar from './components/Sidebar';
import TopArtists from './TopArtists';
import Statistics from './Statistics'
import UserPlaylists from './UserPlaylists';
import { Routes, Route, Link, Outlet } from 'react-router-dom';


function Home({ spotify }) {
  return (
      <div className="home">
          <div className="home-body">
            <Sidebar />
  
            <Outlet />
  
          </div>
      </div>

  );
}

export default Home;