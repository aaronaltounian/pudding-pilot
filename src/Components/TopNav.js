import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  } from 'reactstrap';
import {Link} from 'react-router-dom'
import LoginModal from './LoginModal';

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout() {
    localStorage.clear();
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
  }

  displayUserDropdown() {
    if(this.props.user === '') {
      return;
    }
    else {
      localStorage.setItem('caret', true)
      return (
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav>
            {this.props.user} &#9660;
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <NavLink tag={Link} to="/hangar/">Hangar</NavLink>
            </DropdownItem>
            <DropdownItem>
              <NavLink tag={Link} to='/locations/'>Locations</NavLink>
            </DropdownItem>
            <DropdownItem divider></DropdownItem>
            <DropdownItem>
              <NavLink to='#' onClick={this.logout()}>Log Out</NavLink>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">RC Aircraft Wind Sock</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to='/current-weather/'>Weather Forecast</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/map/">View Map</NavLink>
              </NavItem>
              {this.displayUserDropdown()}
            </Nav>
            <LoginModal setUser={this.props.setUser} toggleCaret={this.toggleCaret} />
          </Collapse>
        </Navbar>
      </div>
    );
  }
}