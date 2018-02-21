import React from 'react'
import { NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap'

const Navbar = React.createClass({
  handleSelect(eventKey) {
    event.preventDefault();
    console.log('Home button pressed');
  },

  render() {
    return (
      <Nav bsStyle="tabs" activeKey="2" onSelect={this.handleSelect}>
        <NavItem eventKey="1" href="/home">Home</NavItem>
        <NavItem eventKey="2">Crawler Form</NavItem>
        <NavItem eventKey="3">Crawler Results</NavItem>
      </Nav>
    );
  }
});

export default Navbar
