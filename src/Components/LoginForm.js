import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class LoginForm extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.state = {
  //     loginMessage: ''
  //   }
  // }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   let username = e.target.username.value;
  //   let password = e.target.password.value;
  //   let loginData = JSON.stringify({'username': username, 'password': password})
  //   fetch('/api/sessions', {
  //     method: 'POST',
  //     headers: { "Content-Type": "application/json" },
  //     body: loginData
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       localStorage.setItem('token', data.token);
  //       console.log(localStorage.getItem('token'));
  //       this.setState({loginMessage: data.message}, () => this.props.toggleModal());
  //     });
  // }

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit} >
        <h3>{this.props.title}</h3>
        <FormGroup>
          <Label for="user">Username</Label>
          <Input type="text" name="username" onChange={this.handleChange} placeholder="randyrhoads" />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" placeholder="password123" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}