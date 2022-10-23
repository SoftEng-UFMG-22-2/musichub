import React from 'react';
import './Home.css';
import Sidebar from './components/Sidebar';
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