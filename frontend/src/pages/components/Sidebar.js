import React from 'react'
import './Sidebar.css';
import SidebarOption from './SidebarOption';
import HomeIcon from '@mui/icons-material/Home';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useDataLayerValue } from '../../DataLayer';
import { Link } from 'react-router-dom';

function Sidebar() {
 
  return (
    
        <div className="sidebar">
            {/* TODO linkar imagem do usuario a essa imagem */}
            <img className="sidebar-avatar" src="https://cdn-icons-png.flaticon.com/512/147/147133.png"/>
            
            <Link to="/" style={{ textDecoration: 'none' }}>
              <SidebarOption title="Home" Icon={HomeIcon}/>
            </Link>
            
            <Link to="playlists" style={{ textDecoration: 'none' }}>
              <SidebarOption title="Playlists" Icon={PlaylistPlayIcon}/>
            </Link>
            
            <Link to="mixar" style={{ textDecoration: 'none' }}>
              <SidebarOption title="Mixar Playlists" Icon={BarChartIcon}/>
            </Link>
            
        </div>

  )
}

export default Sidebar