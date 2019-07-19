import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import MapContainer from './Components/MapContainer';
import TopNav from './Components/TopNav';
import Home from './Components/Home';

function App() {
  return (
    <Router className="App" style={{height: window.innerHeight}}>
      <TopNav className='navbar' />
      
      <Route exact path="/" component={Home} />
      <Route path="/map" component={MapContainer} />
      <Route path="/hangar" component={Hangar} />
    </Router>
  );
}

function Hangar() {
  return <h1>Hangar</h1>
}

export default App;
