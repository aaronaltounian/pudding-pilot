import React from 'react';
import { Button, Input, Form, FormGroup } from 'reactstrap';

let myStorage = window.localStorage;

let ZipcodeSearchBox = (props) => {
    return (
        <Form inline style={{margin:'auto'}} method="POST" action={props.path}>
            <FormGroup>
                <Input size='lg' type='text' placeholder='Enter zipcode here' name='zipcode'></Input>
                <Button size='lg' onClick={() => props.changeDisplayed('weather')}>Get Weather</Button>
            </FormGroup>
        </Form>
    )
}

export default ZipcodeSearchBox;