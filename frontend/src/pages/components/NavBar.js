import React from 'react'
import NavBarOption from './NavBarOption'
import './NavBar.css'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className='navbar'>
        <Link to="artistas" style={{ textDecoration: 'none' }}>
            <NavBarOption title="Artistas"/>
        </Link>
        
        <Link to="musicas" style={{ textDecoration: 'none' }}s>
            <NavBarOption title="Músicas"/>
        </Link>

    </div>
  )
}

export default NavBar