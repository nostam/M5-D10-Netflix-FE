import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import { Link, withRouter, NavLink } from "react-router-dom";
import logo from "../../imgs/LOGO.png";
import "./index.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import NavBarSearch from "../../components/NavBarSearch";

function NavBar(props) {
  const [showSearchBox, setShowSearchBox] = useState(false);
  return (
    <>
      <Navbar expand="lg" className="nav">
        <Link to="/">
          <Navbar.Brand href="#home">
            <img className="logo" src={logo} alt="netflix" />
            <span className="sr-only">{props.title}</span>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink to="/" exact activeClassName="active" className="nav">
              Home
            </NavLink>
            <NavLink
              to="/movie/tt0848228"
              exact
              activeClassName="active"
              className="nav mx-2"
            >
              The Avengers
            </NavLink>
            <NavLink
              to="/series/lord of the ring"
              exact
              activeClassName="active"
              className="nav mx-2"
            >
              Lord of the rings Series
            </NavLink>

            <NavLink
              to="/series/Fate Stay Night"
              exact
              activeClassName="active"
              className="nav mx-2"
            >
              Fate Series
            </NavLink>
          </Nav>
          <Form inline>
            {showSearchBox && <NavBarSearch />}
            <FontAwesomeIcon
              icon={faSearch}
              onClick={() => setShowSearchBox(!showSearchBox)}
            />
            <Nav.Link href="#link" className="nav">
              KIDS
            </Nav.Link>
            <NavDropdown
              title="User"
              id="nav-user-dropdown-menu"
              className="nav"
              alignRight
              style={{ color: "gray !important" }}
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#link"></Nav.Link>
            <Nav.Link href="#link"></Nav.Link>
          </Form>
          <Link to="/register">
            <span>Register</span>
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default withRouter(NavBar);
