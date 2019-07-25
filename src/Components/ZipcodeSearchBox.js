import React from 'react';
import { Button, Input, Form, FormGroup } from 'reactstrap';

const ZipcodeSearchBox = (props) => {
    return (
        <Form inline style={{margin:'auto'}} method="POST" action={props.path}>
            <FormGroup>
                <Input size='lg' type='text' placeholder='Enter zipcode here' name='zipcode'></Input>
                <Button size='lg'>Get Weather</Button>
            </FormGroup>
        </Form>
    )
}

export default ZipcodeSearchBox;