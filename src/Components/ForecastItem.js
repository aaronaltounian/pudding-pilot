import React, { Component } from 'react';
import { Card, CardTitle, CardImg, CardText, CardHeader, CardBody, Badge } from 'reactstrap';

const ForecastItem = (props) => {

    return (
        <Card body inverse color='primary' style={{margin: '10px 0'}}>
            <CardHeader>
                <h1>{props.time}</h1>
            </CardHeader>
            <CardBody>
                <h3><Badge color={props.color}>{props.recommendation}</Badge></h3>
                <CardTitle>{props.summary}</CardTitle>
                <CardText>Wind Speed: {props.windSpeed}mph. Gust Speed: {props.windGust} mph.</CardText>
                <CardText>Winds out of the {props.windDirection}</CardText>
                <CardText>Wind Bearing: {props.windBearing}</CardText>
            </CardBody>
        </Card>
    )
}

export default ForecastItem;
