import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';

const ForecastItem = (props) => {

    return (
        <ListGroupItem>
            <div>Time: {props.time} Summary: {props.summary}</div>
        </ListGroupItem>
    )
}

export default ForecastItem;
