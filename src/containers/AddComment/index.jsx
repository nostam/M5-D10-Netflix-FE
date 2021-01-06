import React from "react";
import { Container, Row, Col, Form, Alert, Spinner } from "react-bootstrap";

class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieID: "",
      comment: {
        comment: "",
        rate: 0,
        elementId: "",
      },
      errMessage: "",
      loading: false,
    };
  }
  componentDidUpdazte = async (prevProp, prevState) => {
    if (prevProp.movieID !== this.props.movieID) {
      this.setState({ movieID: this.props.movieID });
    }
  };
  updateCommentField = (e) => {
    let comment = { ...this.state.comment }; // creating a copy of the current state
    let currentId = e.currentTarget.id; // 'name', 'phone', etc.
    console.log("currentId: ", currentId);
    //reservation['phone'] --> reservation.phone = '3'
    comment[currentId] = e.currentTarget.value;
    comment.elementId = this.state.movieID;
    console.log(this.state.movieID);
    this.setState({ comment: comment });
    console.log(this.state.comment);
  };

  submitComment = async (e) => {
    let { movieID } = this.state;
    e.preventDefault();
    this.setState({ loading: true });
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/reviews`, {
        method: "POST",
        body: JSON.stringify(this.state.comment),
      });
      console.log("POST response, ", response);
      if (response.ok) {
        alert("yayyyy! commented successfully!");
        this.setState({
          comment: {
            comment: "",
            rate: 0,
            elementId: "",
          },
          errMessage: "",
          loading: false,
        });
        this.props.updateComments(true);
      } else {
        console.log("an error occurred");
        let error = await response.json();
        this.setState({
          errMessage: error.message,
          loading: false,
        });
      }
    } catch (e) {
      console.log(e); // Error
      this.setState({
        errMessage: e.message,
        loading: false,
      });
    }
  };

  render() {
    return (
      <Container>
        {this.state.errMessage && (
          <Alert variant="danger">
            We encountered a problem with your request.
            {this.state.errMessage}
          </Alert>
        )}
        {this.state.loading && (
          <div className="d-flex justify-content-center my-5">
            Adding your comment, please wait
            <div className="ml-2">
              <Spinner animation="border" variant="success" />
            </div>
          </div>
        )}
        <Form className="w-100 mb-5" onSubmit={this.submitComment}>
          <Row>
            <Col md={12}>
              <Form.Group>
                <Form.Label htmlFor="comment">Add comment: </Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={3}
                  name="comment"
                  id="comment"
                  placeholder="Your comment"
                  required
                  value={this.state.comment.comment}
                  onChange={this.updateCommentField}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group>
                <Form.Label htmlFor="rate">Add rate: </Form.Label>
                <Form.Control
                  type="number"
                  name="rate"
                  id="rate"
                  placeholder="1-5"
                  min="1"
                  max="5"
                  value={this.state.comment.rate}
                  onChange={this.updateCommentField}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <button className="btn-info offset-5" type="Submit">
                {" "}
                Submit{" "}
              </button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default AddComment;
