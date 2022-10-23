import React from 'react';
import './PageLayout.css';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';


function PageLayout() {
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