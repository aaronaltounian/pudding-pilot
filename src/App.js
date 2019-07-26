import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import MapContainer from './Components/MapContainer';
import TopNav from './Components/TopNav';
import Home from './Components/Home';
import Forecast from './Components/Forecast';
import CurrentWeather from './Components/CurrentWeather';
import Error from './Components/Error';
import ZipcodeSearchBox from './Components/ZipcodeSearchBox';

class App extends Component {
  state = {
    displayed: 'home'
  }

  changeDisplayed = (component) => {
    this.setState({
      displayed: component
    })
  }

  render() {
    let toDisplay;
    if(this.state.displayed === 'home') {
      toDisplay = <Home changeDisplayed={this.changeDisplayed} />
    }
    else if(this.state.displayed === 'weather') {
      toDisplay = <CurrentWeather changeDisplayed={this.changeDisplayed} />
    }
    else if(this.state.displayed === 'map') {
      toDisplay = <MapContainer />
    }
    return (
      <div>
        <TopNav changeDisplayed={this.changeDisplayed} />
        {toDisplay}
      </div>
      // <Router className="App" style={{height: window.innerHeight}}>
      //   <TopNav className='navbar' />
        
      //   <Route exact path="/" component={Home} />
      //   <Route path='/current-weather' component={CurrentWeather} />
      //   <Route path="/map" component={MapContainer} />
      //   <Route path="/hangar" component={Hangar} />
      //   <Route path='/error' component={Error} />
      // </Router>
    );
  }
}

function Hangar() {
  return <h1>Hangar</h1>
}

export default App;
