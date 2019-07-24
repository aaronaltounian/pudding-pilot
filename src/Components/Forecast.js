import React, {Component} from 'react';
import { ListGroup } from 'reactstrap'
import ForecastItem from './ForecastItem';
import ZipcodeSearchBox from './ZipcodeSearchBox';

class Forecast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hourly: []
        }
    }

    componentDidMount() {
        fetch('/search-location-weather')
            .then(res => res.json())
            .then(data => {
                this.setState({hourly: data.hourly.data});
                console.log(this.state.hourly)
            })
    }

    generateForecastItems() {
        let forecastItems = [];
        this.state.hourly.map((forecast, index) => {
            forecastItems.push(<ForecastItem time={forecast.time} summary={forecast.summary} key={index} />)
        })
        return forecastItems;
    }

    render() {
        return (
            <div>
                <ZipcodeSearchBox path='/search-location' buttonText='Get Forecast'/>
                <ListGroup>
                    {this.generateForecastItems()}
                </ListGroup>
            </div>

        )
    }
}

export default Forecast;