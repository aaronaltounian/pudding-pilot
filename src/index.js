import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import state from './state';
require('dotenv').config();
const ls = require('local-storage');
// get user location from built in browser navigator.geolocation:
if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        state.centerCoords = {lat: position.coords.latitude, lng: position.coords.longitude};
        ls('lat', position.coords.latitude);
        ls('lng', position.coords.longitude);
        console.log(state.centerCoords);
    });
} else {
    
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
