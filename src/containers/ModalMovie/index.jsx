import React, { Component } from "react";
import { Modal, Button, Container, Col, Row } from "react-bootstrap";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import "./index.css";
import { Link, Route, Switch } from "react-router-dom";

export default class ModalMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currenntMovie: {},
      currentMovieID: props.currenntMovie,
    };
  }

  //   componentDidMount = async (props) => {
  //     console.log(this.state.currenntMovieID);
  //     console.log(this.props.currenntMovie);
  //   };

  componentDidUpdate = async (prevProp, prevState) => {
    if (
      this.props.currentMovie.length > 1 &&
      prevProp.currentMovie !== this.props.currentMovie
    ) {
      let query = this.props.currentMovie.join("");
      await this.fetchMovies(query);
    }
  };
  // omdb i
  fetchMovies = async (q) => {
    const url = process.env.REACT_APP_API_URL;
    try {
      let res = await fetch(url + "/media/" + q);
      if (res.ok) {
        let data = await res.json();
        console.log(data);
        console.log(typeof data);
        this.setState({ currentMovie: data });
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    let { show, handleClose } = this.props;
    let { currentMovie } = this.state;
    return (
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-90w"
        className="movieModal"
      >
        <Modal.Header
          closeButton
          style={{
            backgroundImage: `url(${currentMovie?.Poster}})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            height: `500px`,
          }}
        ></Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md={11}>
                <h4>{currentMovie?.Title}</h4>
                <h6>{currentMovie?.Genre}</h6>
                <h6>
                  {currentMovie?.Year} - {currentMovie?.Rated} -
                  {currentMovie?.Runtime}
                </h6>
                <h6>Imdb rating: {currentMovie?.imdbRating}</h6>
                <p className="modalMovie__description"></p>
              </Col>
              <Col md={1} className="d-flex align-items-center">
                <Link to={`/movie/${currentMovie?.imdbID}`}>
                  <NavigateNextIcon
                    style={{ cursor: "pointer", fontSize: "30px" }}
                  />
                </Link>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    );
  }
}
