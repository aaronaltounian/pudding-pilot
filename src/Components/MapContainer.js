import { Map, GoogleApiWrapper } from 'google-maps-react';
import React, {Component} from 'react';

const mapStyles = {
    height: '500px'
}

const MapContainer = (props) => {
    return (
        <Map
            google={props.google}
            zoom={10}
            style={mapStyles}
            initialCenter={{lat:30.2672, lng: -97.7431}}
        />
    )
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
  })(MapContainer);
  
// class MapContainer extends Component {
//     constructor(props) {
//         super(props)
//     }

//     render() {
//         return (
//             <Map
//                 google={this.props.google}
//                 zoom={10}
//                 style={mapStyles}
//                 initialCenter={{lat:30.2672, lng: -97.7431}}
//             />
//         )
//     }
// }