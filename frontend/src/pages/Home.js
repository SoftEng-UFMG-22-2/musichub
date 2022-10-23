import React from 'react'
import './Home.css'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div className='home-body'>

        <NavBar />
        
        <Outlet />

    </div>
  )
}

export default Home