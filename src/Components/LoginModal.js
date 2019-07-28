import React from 'react';
import { Button, ButtonGroup, Modal, ModalHeader, ModalBody, Alert } from 'reactstrap';
import LoginForm from './LoginForm'

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      displayed: 'login',
      message: '',
      alertMessage: '',
      rSelected: 1
    };
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.toggle = this.toggle.bind(this);
  }

  //function to login user with fetch request. passed down to login form:
  handleLogin(e) {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    let loginData = JSON.stringify({'username': username, 'password': password})
    fetch('/api/sessions', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: loginData
    })
      .then(res => res.json())
      .then(data => {
        this.props.setUser(data.user);
        localStorage.setItem('user', data.user)
        localStorage.setItem('token', data.token);
        this.setState({message: data.message}, () => {
          this.handleAlert(this.state.message);
          if(this.state.message === 'success') {
            setTimeout(this.toggle, 1000);
          }
        });
      });
  }

  //function to register new user with fetch request. passed down to login form:
  handleRegister(e) {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    let registerData = JSON.stringify({'username': username, 'password': password})
    console.log(registerData)
    fetch('/api/users', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: registerData
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          message: data.message
        }, () => {
          this.handleAlert(this.state.message);
        })
      });    
  }

  //function to close modal:
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleAlert = (value) => {
    this.setState({
      alertMessage: value
    })
  }

  //the following set state and use that to generate either login or register forms in the modal (otherwise identical except for the function that's called on submit):
  viewLogin() {
    this.setState({
      displayed:'login',
      rSelected: 1
    });
  };
  
  viewRegister() {
    this.setState({
      displayed:'register',
      rSelected: 2
    }, 
    () => console.log(this.state)
    );
  }

  displayedForm() {
    let toDisplay;
    if(this.state.displayed === 'login') {
      toDisplay = <LoginForm handleSubmit={this.handleLogin} title='Login' />
    }
    else if(this.state.displayed === 'register') {
      toDisplay = <LoginForm handleSubmit={this.handleRegister} title='Register' />
    }
    return toDisplay;
  }

  alertMessage() {
    if(this.state.alertMessage === 'success') {
      return <Alert color="success">Login successful!</Alert>
    }
    else if(this.state.alertMessage === 'failure') {
      return <Alert color="danger">Username or password is incorrect!</Alert>
    }
    else if(this.state.alertMessage === 'created') {
      return <Alert color="success">Account successfully created!</Alert>
    }
    else if(this.state.alertMessage === 'exists') {
      return <Alert color="danger">An account with that username already exists!</Alert>
    }
    else return;
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>Login/Register</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>
            <ButtonGroup>
              <Button color="primary" onClick={() => this.viewLogin()} active={this.state.rSelected === 1}>Login</Button>
              <Button color="primary" onClick={() => this.viewRegister()} active={this.state.rSelected === 2}>Register</Button>              
            </ButtonGroup>

          </ModalHeader>
          <ModalBody>
            {this.displayedForm()}
          </ModalBody>
          {this.alertMessage()}
        </Modal>
      </div>
    );
  }
}

export default LoginModal;