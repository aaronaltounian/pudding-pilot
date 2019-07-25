import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import MapContainer from './Components/MapContainer';
import TopNav from './Components/TopNav';
import Home from './Components/Home';
import Forecast from './Components/Forecast';
import CurrentWeather from './Components/CurrentWeather';
import Error from './Components/Error';

class App extends Component {

  render() {
    // let toDisplay;
    // if(this.state.displayed === 'home') toDisplay = <Home />
    // else if(this.state.displayed === 'forecast') toDisplay = <Forecast />
    // else if(this.state.displayed === 'map') toDisplay = <MapContainer />
    // else if(this.state.displayed === 'hangar') toDisplay = <Hangar />
    // return(
    //   <div>
    //     <TopNav className='navbar' viewHome={this.viewHome} viewForecast={this.viewForecast} viewMap={this.viewMap} viewHangar={this.viewHangar}/>
    //     {toDisplay}
    //   </div>
    // )
    return (
      <Router className="App" style={{height: window.innerHeight}}>
        <TopNav className='navbar' />
        
        <Route exact path="/" component={Home} />
        <Route path='/current-weather' component={CurrentWeather} />
        <Route path="/map" component={MapContainer} />
        <Route path="/hangar" component={Hangar} />
        <Route path='/error' component={Error} />
      </Router>
    );
  }
}

function Hangar() {
  return <h1>Hangar</h1>
}

export default App;
