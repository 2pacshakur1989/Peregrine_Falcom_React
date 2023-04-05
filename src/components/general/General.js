import React from 'react'
import './General.css';
import Navbar from './Navbar';

export default function General() {
  return (
    
<div style={{ position: 'relative' }}>
  <Navbar/>
  
  <br />
  
  <div id='icon' className="icon" style={{ position: 'absolute', top: 60, left: 0 }}></div> 
  <h1 id='Header' style={{ position: 'absolute', top: 70, left: 0 }}>Peregrine Falcon</h1>
    
</div>

);
}
