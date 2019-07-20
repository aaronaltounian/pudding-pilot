// Map loader component to handle all the google maps related shenanigans:

import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import React, {Component} from 'react';
import state from '../state';

// get user location from built in browser navigator.geolocation to tell the map where to center:
if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        state.centerCoords = {lat: position.coords.latitude, lng: position.coords.longitude};
    });
} else {
    
}

// object for JSX inline styling to pass in the Maps component:
const mapStyles = {
    height: '90vh'
}

// Function to generate & return an array of Marker components from state in order to display them on the map: 
function generateMarkers() {
    let markers = [];
    state.markers.map(marker => {
        markers.push(<Marker title={marker.title} name={marker.name} position={marker.position} />)
    })
    return markers;
}

export class MapContainer extends Component {

    render() {
        return (
          <Map google={this.props.google} zoom={14} style={mapStyles} initialCenter={state.centerCoords}>
     
            {generateMarkers()}
     
            <InfoWindow onClose={this.onInfoWindowClose}>
                <div>
                  <h1>Test InfoWindow</h1>
                </div>
            </InfoWindow>
          </Map>
        );
    }
}

// const MapContainer = (props) => {
//     return (
//         <Map
//             google={props.google}
//             zoom={15}
//             style={mapStyles}
//             initialCenter={centerCoords}
//         >
//             {generateMarkers()}
//         </Map>
//     )
// }

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
  })(MapContainer);
