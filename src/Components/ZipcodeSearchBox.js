import React, {Component} from 'react';
import { Button, Input, Form, FormGroup } from 'reactstrap';
import {Redirect} from 'react-router-dom';

class ZipcodeSearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fireRedirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        localStorage.setItem('zipcode', e.target.zipcode.value);
        let zipcode = JSON.stringify({'zipcode': e.target.zipcode.value});
        console.log(zipcode);
        fetch('/search-location', {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: zipcode
        });

        // fetch(`get-weather/${e.target.zipcode.value}`)
        if(this.state.fireRedirect) {
            this.setState({fireRedirect: false})
        }
        else this.setState({fireRedirect: true});
    }

    render() {
        return (
            <Form inline style={{margin:'auto'}} onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Input size='lg' type='text' placeholder='Enter zipcode here' defaultValue={this.props.value} name='zipcode'></Input>
                    <Button size='lg'>Get Weather</Button>
                </FormGroup>
                {this.state.fireRedirect && (<Redirect to='/current-weather' />)}
            </Form>
        )
    }
}

export default ZipcodeSearchBox;