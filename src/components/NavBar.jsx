import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import logo from "../imgs/LOGO.png";
import "../styles/NavBar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const NavBar = (props) => {
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
            <Link to="/" activeClassName="active">
              <Nav.Link href="#home" className="nav">
                Home
              </Nav.Link>
            </Link>
            <Link to="/movie/tt0372784" activeClassName="active">
              <Nav.Link href="#link" className="nav">
                Batman Begins
              </Nav.Link>
            </Link>
            <Link to="/series/Harry Potter" activeClassName="active">
              <Nav.Link href="/series/Harry+Potter" className="nav">
                Harry Potter Series
              </Nav.Link>
            </Link>
            <Link to="/series/Fate Stay Night" activeClassName="active">
              <Nav.Link href="/series/Fate+Stay+Night" className="nav">
                Fate Series
              </Nav.Link>
            </Link>
            {/* <Link to="/" activeClassName="active">
              <Nav.Link href="#link" className="nav">
                Recently Added
              </Nav.Link>
            </Link>
            <Link to="/" activeClassName="active">
              <Nav.Link href="#link" className="nav">
                My List
              </Nav.Link>
            </Link> */}
          </Nav>
          <Form inline>
            <FontAwesomeIcon icon={faSearch} />
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
};

export default withRouter(NavBar);
