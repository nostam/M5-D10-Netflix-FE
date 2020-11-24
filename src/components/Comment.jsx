import React from "react";
import { Row, Col } from "react-bootstrap";

const Comment = (props) => {
  return (
    <Row className="my-4" key={props.comments._id}>
      {console.log(props)}
      <Col style={{ backgroundColor: "#141414", color: "#fff" }}>
        <h6>{props.comments.comment}</h6> <br />
        <span>Rating: {props.comments.rate} out of 5 </span>
        <br />
        <span>By {props.comments.author}</span>
      </Col>
      <button
        className="btn-danger"
        style={{
          width: "24px",
          height: "24px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0",
          margin: "0",
        }}
        onClick={props.handleDel}
      >
        ✕
      </button>
    </Row>
  );
};

export default Comment;
