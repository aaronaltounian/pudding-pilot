import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import ZipcodeSearchBox from './ZipcodeSearchBox';

export default class CurrentWeather extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            currentTemp: '',
            humidity: '',
            pressure: '',
            windSpeed: '',
            windGust: '',
            windBearing: '',
            currentCondition: '',
            precipProbability: '',
        })
    }

    componentDidMount() {
        fetch('/search-location-weather')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    currentTemp: data.currently.temperature,
                    humidity: data.currently.humidity,
                    pressure: data.currently.pressure,
                    windSpeed: data.currently.windSpeed,
                    windGust: data.currently.windGust,
                    windBearing: data.currently.windBearing,
                    currentCondition: data.currently.summary,
                    precipProbability: data.currently.precipProbability
                })
                console.log(this.state);
            })
    }

    // basic function to deliver flight recommendation solely based on wind speed:
    isGoodFlying() {
        let recommendation = '';

        if(this.state.windSpeed <= 5 && this.state.windGust <=5) recommendation = 'Flight conditions are as good as they get with low wind & gust speed.'
        else if(this.state.windSpeed <= 10 && this.state.windGust <= 15) recommendation = 'Flight conditions are average with potential for minor gusts.'
        else recommendation = 'It is likely too windy to fly!'

        return recommendation;
    }

    // function to convert wind bearing degrees to a more useful direction:
    convertDegreesToDirection() {
        let val = Math.floor((this.state.windBearing / 22.5) + 0.5);
        let arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }

    render() {
        return (
            <div>
              <ZipcodeSearchBox />
              <Card style={{width: '50vw'}}>
                <CardImg top width="100%" style={{height: '128px', width: '128px'}} src="https://cdn3.iconfinder.com/data/icons/weather-92/64/_Small_Clouds-512.png" alt="Card image cap" />
                <CardBody>
                  <CardTitle>{this.state.currentCondition}</CardTitle>
                  <CardText>Wind Speed: {this.state.windSpeed} mph</CardText>
                  <CardText>Wind Gust: {this.state.windGust} mph</CardText>
                  <CardText>Winds out of the {this.convertDegreesToDirection()}</CardText>
                  <CardText>Wind Bearing: {this.state.windBearing} degrees</CardText>
                  <CardText>{this.isGoodFlying()}</CardText>
                </CardBody>
              </Card>
            </div>
          );
    }
}