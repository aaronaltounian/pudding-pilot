import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import ZipcodeSearchBox from './ZipcodeSearchBox';
import ForecastItem from './ForecastItem';
import * as moment from 'moment'
const ls = require('local-storage');

export default class CurrentWeather extends Component {
    constructor(props) {
        super(props);
        this.determineFlyingPerPlane = this.determineFlyingPerPlane.bind(this);
        this.state = ({
            isLoading: false,
            currently: {},
            hourly: [],
            planes: [],
            goodHours: [],
            color: ''
        })
    }

    componentDidMount() {
        this.props.history.push('/current-weather')
        this.setState({isLoading: true});
        let token = ls('token')
        let lat = ls('lat');
        let lng = ls('lng');
        fetch(`/search-location-weather?lat=${lat}&lng=${lng}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    isLoading: false,
                    currently: data.currently,
                    hourly: data.hourly.data
                })
                console.log(this.state.hourly);
            })
        if(token) {
            fetch(`/planes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(planes => {
                console.log(planes);
                this.setState({
                    planes: planes
                });
            })
        }
    }

    // basic function to deliver flight recommendation solely based on wind speed:
    isGoodFlying(windSpeed, windGust) {
        let recommendation = '';

        if(windSpeed <= 5 && windGust <=7) {
            recommendation = 'Good wind conditions!';
        }
        else if(windSpeed <= 10 && windGust <= 15) {
            recommendation = 'Average wind conditions.'
        }
        else {
            recommendation = 'It is likely too windy to fly!'
        }
        return recommendation;
    }

    determineFlyingPerPlane() {
        // get user planes
        let planes = this.state.planes;
        //get forecast hours
        let hours = this.state.hourly;
        // set array to store hours that match plane parameters
        let goodHours = [];
        // loop thru the hourly forecast
        for(let i = 0; i < hours.length; i++) {
            // loop through the planes
            for(let j = 0; j < planes.length; j++) {
                // check the hourly forecast wind speeds against the plane wind speeds
                if(hours[i].windSpeed <= planes[j].maxWind && hours[i].windGust <= planes[j].maxGust) {
                    // add the plane model name to the hourly forecast object
                    hours[i].plane = planes[j].model;
                    // push the hourly forecast object to the goodHours array:
                    goodHours.push(hours[i])
                }                
            }
        }
        return this.generateForecastCards(goodHours);
    }
    // generate color for warning badge (gotta be a better way to do this and isGoodFlying but this works for now):
    generateColor(windSpeed, windGust) {
        let color = '';
        if(windSpeed <= 5 && windGust <=7) {
            color = 'success'
        }
        else if(windSpeed <= 10 && windGust <= 15) {
            color = 'warning'
        }
        else {
            color = 'danger'
        }
        return color;
    }

    // function to convert wind bearing degrees to a more useful direction:
    convertDegreesToDirection(deg) {
        let val = Math.floor((deg / 22.5) + 0.5);
        let arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }

    // function to map the hourly forecast state into card components to render on the page:
    generateForecastCards(forecast) {
        let forecastCards = [];
        forecast.map( (forecast, index) => {
            let time = moment.unix(forecast.time).format("ddd, hA");
            forecastCards.push(
                <ForecastItem 
                    key={index}
                    time={time}
                    color={this.generateColor(forecast.windSpeed, forecast.windGust)}
                    recommendation={this.isGoodFlying(forecast.windSpeed, forecast.windGust)}
                    summary={forecast.summary}
                    windSpeed={forecast.windSpeed}
                    windGust={forecast.windGust}
                    windBearing={forecast.windBearing}
                    windDirection={this.convertDegreesToDirection(forecast.windBearing)}
                    plane={forecast.plane}
                />
            )
        })
        return forecastCards;
    }

    render() {
        if(this.state.isLoading) {
            return (
                <div>
                    <Spinner />
                    <Spinner />
                    <Spinner />
                    <Spinner />
                    <Spinner />
                </div>
            )
        }
        else {
            if(this.state.planes.length === 0) {
                return (
                    <div>
                        {/* <ZipcodeSearchBox value={localStorage.getItem('zipcode')}/> */}
                        {this.generateForecastCards(this.state.hourly)}
                    </div>
                );
            } 
            else {
                return(
                    <div>
                        {this.determineFlyingPerPlane()}
                    </div>
                )
            }
        }
    }
}