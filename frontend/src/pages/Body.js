import React from 'react';
import { useDataLayerValue } from '../DataLayer';
import './Body.css'
import Artist from './components/Artist'


function Body() {
  const [ {top_artists}, dispatch] = useDataLayerValue();
  return (
    <div className="body">

        <div className="top-artists-container">
          { top_artists?.items?.map(artist => (
            <Artist name={artist.name} image={artist.images[0].url}/>
          ))}
        </div>
    </div>
  )
}

export default Body