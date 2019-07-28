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
  constructor(props) {
    super(props);
    this.state = {
      user: localStorage.getItem('user'),
      isLoggedIn: false
    }
    this.setUser = this.setUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');
  }

  setUser = (user, boolean) => {
    this.setState({
      user: user,
      isLoggedIn: boolean
    });
  }

  logout() {
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    return (
      <Router className="App" style={{height: window.innerHeight}}>
        <TopNav className='navbar' 
          setUser={this.setUser} 
          user={this.state.user} 
          isLoggedIn={this.state.isLoggedIn} 
          logOut={this.logOut} 
        />
        
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
