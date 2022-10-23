import React from 'react'
import './Sidebar.css';
import SidebarOption from './SidebarOption';
import HomeIcon from '@mui/icons-material/Home';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDataLayerValue } from '../../DataLayer';
import { Link } from 'react-router-dom';

const logoutSpotifySession = async () => {
  const requestOptions = {
    method: "GET",
  };

  const response = await fetch("http://localhost:8000/api/logout", requestOptions)
  const data = await response.json();

  return data;
}

const redirectToLogin = async () => {
  logoutSpotifySession();
}


const handleLogout = () => {
  redirectToLogin();
}

function Sidebar() {
 
  return (
    
        <div className="sidebar">
            {/* TODO linkar imagem do usuario a essa imagem */}
            <img className="sidebar-logo" src="https://i.postimg.cc/fW7WBx4r/logo.png"/>
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

            <a href="http://localhost:3000/" onClick={() => { handleLogout(); }} style={{ textDecoration: 'none' }}>
              <SidebarOption title="Sair" Icon={LogoutIcon}/>
            </a>
            
        </div>

  )
}

export default Sidebar