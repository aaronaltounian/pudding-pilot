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

const ls = require('local-storage');

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
    ls.clear()
  }

  displayUserDropdown() {
    // if(!this.props.isLoggedIn) {
    //   return;
    // }
    // else {
    //   return (
    //     <UncontrolledDropdown nav inNavbar>
    //       <DropdownToggle nav>
    //         {this.props.user} &#9660;
    //       </DropdownToggle>
    //       <DropdownMenu right>
    //         <DropdownItem>
    //           <NavLink tag={Link} to="/hangar/">Hangar</NavLink>
    //         </DropdownItem>
    //         <DropdownItem>
    //           <NavLink tag={Link} to='/locations/'>Locations</NavLink>
    //         </DropdownItem>
    //         <DropdownItem divider></DropdownItem>
    //         <DropdownItem>
    //           <NavLink to='#' onClick={this.logout()}>Log Out</NavLink>
    //         </DropdownItem>
    //       </DropdownMenu>
    //     </UncontrolledDropdown>
    //   )
    // }
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
            <NavLink onClick={this.logout()}>Log Out</NavLink>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
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
            <LoginModal setUser={this.props.setUser} />
          </Collapse>
        </Navbar>
      </div>
    );
  }
}