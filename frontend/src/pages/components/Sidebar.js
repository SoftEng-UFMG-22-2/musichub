import React from 'react'
import './Sidebar.css';
import SidebarOption from './SidebarOption';
import HomeIcon from '@mui/icons-material/Home';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useDataLayerValue } from '../../DataLayer';


function Sidebar() {
 
  return (
    <div className="sidebar">
        {/* TODO linkar imagem do usuario a essa imagem */}
        <img className="sidebar-avatar" src="https://cdn-icons-png.flaticon.com/512/147/147133.png"/>
        <SidebarOption title="Home" Icon={HomeIcon}/>
        <SidebarOption title="Playlists" Icon={PlaylistPlayIcon}/>
        <SidebarOption title="Estatísticas" Icon={BarChartIcon}/>
     
    </div>
  )
}

export default Sidebar