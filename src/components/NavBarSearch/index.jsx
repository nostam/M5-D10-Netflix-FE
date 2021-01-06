import React, { useContext } from "react";
import { Form, Row } from "react-bootstrap";
import "./index.css";

export default function NavBarSearch() {
  // const searchQuery = useContext()
  return (
    <Form.Group as={Row} controlId="navbar-searchBox">
      <Form.Control type="text" placeholder="Enter keywords" />
    </Form.Group>
  );
}
