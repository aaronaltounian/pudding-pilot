import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LoginForm from './LoginForm'

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      displayed: 'login',
      message: ''
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
        localStorage.setItem('token', data.token);
        console.log(localStorage.getItem('token'));
        this.setState({message: data.message}, () => {alert(this.state.message); this.toggle()});
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
        }, () => {alert(this.state.message); this.toggle()})
      });    
  }

  //function to close modal:
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  //the following set state and use that to generate either login or register forms in the modal (otherwise identical except for the function that's called on submit):
  viewLogin() {
    this.setState({displayed:'login'});
  };
  
  viewRegister() {
    this.setState({displayed:'register'}, () => console.log(this.state));
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

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>Login/Register</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>
            <Button onClick={() => this.viewLogin()}>Login</Button>
            <Button onClick={() => this.viewRegister()}>Register</Button>
          </ModalHeader>
          <ModalBody>
            {this.displayedForm()}
          </ModalBody>
          {/* <ModalHeader>
            Register
          </ModalHeader>
          <ModalBody>
            <LoginForm handleSubmit={this.handleRegister} />
          </ModalBody> */}
        </Modal>
      </div>
    );
  }
}

export default LoginModal;