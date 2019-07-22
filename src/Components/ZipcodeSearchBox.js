import React from 'react';
import { Button, Input, Form, FormGroup } from 'reactstrap';

let ZipcodeSearchBox = (props) => {
    return (
        <Form inline style={{margin:'auto'}} method="POST" action="/search-location">
            <FormGroup>
            <Input type='text' placeholder='Enter zipcode here' name='zipcode'></Input>
            <Button>See Flying Forecast</Button>
            </FormGroup>
        </Form>
    )
}

export default ZipcodeSearchBox;