import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import ZipcodeSearchBox from './ZipcodeSearchBox';
import ForecastItem from './ForecastItem';

export default class CurrentWeather extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            isLoading: false,
            currently: {},
            hourly: [],
            color: ''
        })
    }

    componentDidMount() {
        fetch('/search-location-weather')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    isLoading: false,
                    currently: data.currently,
                    hourly: data.hourly.data
                })
                console.log(this.state);
            })
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
    generateForecastCards() {
        let forecastCards = [];
        this.state.hourly.map( (forecast, index) => {
            forecastCards.push(
                <ForecastItem 
                    key={index}
                    time={forecast.time}
                    color={this.generateColor(forecast.windSpeed, forecast.windGust)}
                    recommendation={this.isGoodFlying(forecast.windSpeed, forecast.windGust)}
                    summary={forecast.summary}
                    windSpeed={forecast.windSpeed}
                    windGust={forecast.windGust}
                    windBearing={forecast.windBearing}
                    windDirection={this.convertDegreesToDirection(forecast.windBearing)}
                />
            )
        })
        return forecastCards;
    }

    render() {
        return (
            <div>
                <ZipcodeSearchBox changeDisplayed={this.props.changeDisplayed} path='/search-location' buttonText='See Current Weather'/>
                <ForecastItem 
                    color={this.generateColor(this.state.currently.windSpeed, this.state.currently.windGust)}
                    time={'Currently'}
                    recommendation={this.isGoodFlying(this.state.currently.windSpeed, this.state.currently.windGust)}
                    summary={this.state.currently.summary}
                    windSpeed={this.state.currently.windSpeed}
                    windGust={this.state.currently.windGust}
                    windBearing={this.state.currently.windBearing}
                    windDirection={this.convertDegreesToDirection(this.state.currently.windBearing)}
                />
                {this.generateForecastCards()}
            </div>
        );
    }
}