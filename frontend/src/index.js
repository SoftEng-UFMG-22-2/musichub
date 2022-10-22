import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { DataLayer } from './DataLayer';
import reducer, { initialState } from './reducer';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>
      
      <DataLayer initialState={initialState} reducer={reducer}>
        
        <Routes>
    
          <Route path="/" element={<App />}/>
          
        </Routes>

      </DataLayer>

    </BrowserRouter>

  </React.StrictMode>
);
