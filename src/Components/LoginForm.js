import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class LoginForm extends React.Component {
  render() {
    return (
      <Form method='POST' action='/api/users' >
        <FormGroup>
          <Label for="user">Username</Label>
          <Input type="text" name="username" id="user" placeholder="randyrhoads" />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" placeholder="password123" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}