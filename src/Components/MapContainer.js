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
    state.markers.map((marker, index) => {
        markers.push(<Marker title={marker.title} name={marker.name} position={marker.position} key={index} />)
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

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
  })(MapContainer);


// import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
// class MapContainer extends Component {
//   static defaultProps = {
//     center: {
//       lat: 59.95,
//       lng: 30.33
//     },
//     zoom: 11
//   };
 
//   render() {
//     return (
//       // Important! Always set the container height explicitly
//       <div style={{ height: '90vh', width: '100%' }}>
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
//           defaultCenter={this.props.center}
//           defaultZoom={this.props.zoom}
//         >
//           <AnyReactComponent
//             lat={59.955413}
//             lng={30.337844}
//             text="Marker Text"
//           />
//         </GoogleMapReact>
//       </div>
//     );
//   }
// }
 
// export default MapContainer;

