import React from 'react';
import './Home.css';
import Sidebar from './components/Sidebar';
import Body from './Body';
import Footer from './components/Footer';

function Home({ spotify }) {
  return (
    <div className="home">
        <div className="home-body">
          <Sidebar />
          <Body />
        </div>

        {/* <Footer /> */}
    </div>
  );
}

export default Home;