import React from 'react';
import './Home.css';
import Sidebar from './components/Sidebar';
import Body from './Body';

function Home({ spotify }) {
  return (
    <div className="home">
        <div className="home-body">
          <Sidebar />
          <Body />
        </div>
    </div>
  );
}

export default Home;