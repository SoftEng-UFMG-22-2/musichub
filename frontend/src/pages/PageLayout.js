import React from 'react';
import './PageLayout.css';
import Sidebar from './components/Sidebar';
import { Routes, Route, Link, Outlet } from 'react-router-dom';


function PageLayout({ spotify }) {
  return (
      <div className="page-layout">
          <div className="page-layout-body">
            <Sidebar />
  
            <Outlet />
  
          </div>
      </div>

  );
}

export default PageLayout;