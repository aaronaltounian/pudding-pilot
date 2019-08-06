import React, {Component} from 'react';
import {
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input,
    Alert, 
    Badge, 
    ListGroup, 
    ListGroupItem, 
    ListGroupItemHeading, 
    ListGroupItemText,
    Container,
    Spinner } from 'reactstrap';

const ls = require('local-storage');

class Hangar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            planes: [],
            displayed: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        let token = ls('token');
        if(!token) {
            this.setState({
                isLoading: false,
                displayed: 'alert'
            })
            // toDisplay = <Alert color="danger">You must be logged in to do that!</Alert>
        } else {
            fetch('/planes', {
                method: 'GET',
                headers: {'Content-Type': 'application/json',
                          'Authorization': `Bearer ${token}`},
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    isLoading: false,
                    planes: data
                });
            });
        }
    }

    listPlanes = () => {
        let planes = [];
        if(this.state.planes.length === 0) {
            return <Alert color="warning">No planes found! Add a plane to see weather for your specific flying conditions!</Alert>
        }
        else {
            this.state.planes.map( (plane, index) => {
                planes.push(
                    <ListGroupItem key={index}>
                        <ListGroupItemHeading>{plane.make} {plane.model}</ListGroupItemHeading>
                        <ListGroupItemText>
                            <Badge color="success">Min Speed: {plane.minWind}mph</Badge> 
                            <Badge color="danger">Max Speed: {plane.maxWind}mph</Badge>
                            <Badge color="danger">Max Gust: {plane.maxGust}mph</Badge>
                        </ListGroupItemText>
                    </ListGroupItem>
                )
            })
            return planes;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let make = e.target.make.value;
        let model = e.target.model.value;
        let minWind = e.target.minWind.value;
        let maxWind = e.target.maxWind.value;
        let maxGust = e.target.maxGust.value;
        let newPlane = {
            'make': make,
            'model': model,
            'minWind': minWind,
            'maxWind': maxWind,
            'maxGust': maxGust
        };
        let token = ls('token')
        fetch('/add-plane', {
            method: 'POST',
            headers: {"Content-Type": "application/json",
                      "Authorization": `Bearer ${token}`},
            body: JSON.stringify(newPlane)
        })
        this.setState((prevState) => ({
            planes: [...prevState.planes, newPlane]
        }));
    }

    render() {
        if(this.state.isLoading) {
            return <Spinner />
        } else {
            if(this.state.displayed === 'alert') {
                return <Alert color="danger">Error retrieving planes! Try logging back in.</Alert>
            }
            else {
                return (
                    <Container>
                        <Form inline onSubmit={this.handleSubmit}>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="make" className="mr-sm-2">Make</Label>
                                <Input type="text" name="make" id="make" placeholder="Durafly" />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="model" className="mr-sm-2">Model</Label>
                                <Input type="text" name="model" id="model" placeholder="Tundra" />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="minWind" className="mr-sm-2">Min Wind (mph)</Label>
                                <Input type="number" name="minWind" id="minWind" placeholder="0" />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="maxWind" className="mr-sm-2">Max Wind (mph)</Label>
                                <Input type="number" name="maxWind" id="maxWind" placeholder="10" />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="maxGust" className="mr-sm-2">Max Gust</Label>
                                <Input type="number" name="maxGust" id="maxGust" placeholder="15!" />
                            </FormGroup>
                            <Button>Submit</Button>
                        </Form>
                        <ListGroup>
                            {this.listPlanes()}
                        </ListGroup>
                    </Container>
                )
            }
        }
    }
}

export default Hangar;