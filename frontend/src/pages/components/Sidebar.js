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
            <img className="sidebar-logo" src="https://user-images.githubusercontent.com/72170805/188336584-800c548f-9015-4d0d-bf61-b6cab4e50b7f.png"/>
            <img className="sidebar-avatar" src="https://cdn-icons-png.flaticon.com/512/147/147133.png"/>
            
            <Link to="artistas" style={{ textDecoration: 'none' }}>
              <SidebarOption title="Home" Icon={HomeIcon}/>
            </Link>
            
            <Link to="playlists" style={{ textDecoration: 'none' }}>
              <SidebarOption title="Criar Playlist" Icon={PlaylistPlayIcon}/>
            </Link>
            
            <Link to="mixar" style={{ textDecoration: 'none' }}>
              <SidebarOption title="Mixar Playlist" Icon={BarChartIcon}/>
            </Link>
            
        </div>

  )
}

export default Sidebar