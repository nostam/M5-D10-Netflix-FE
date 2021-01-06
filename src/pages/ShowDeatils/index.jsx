import React, { Component } from "react";
import { Container, Row, Col, Button, FormControl } from "react-bootstrap";
import "./index.css";
import { withRouter } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star";
import StarOutlineIcon from "@material-ui/icons/StarOutlined";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import AddCommentIcon from "@material-ui/icons/AddComment";
import AddComment from "../../containers/AddComment";
import CommentsList from "../../containers/CommentsList";

class showDetail extends Component {
  state = {
    currentMovie: {},
    updateComments: "false",
  };
  componentDidMount = async () => {
    try {
      await this.fetchMovies(this.props.match.params.id);
    } catch (e) {
      console.log(e);
    }
  };
  //omdb i
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
  updateComments = (param) => {
    this.setState({ updateComments: param });
  };
  render() {
    let { currentMovie } = this.state;
    let imdbStars = Array(5)
      .fill("")
      .map((item) => <StarIcon style={{ color: "#ffc107" }} />);
    for (let i = 0; i < 5 - Math.floor(currentMovie.imdbRating / 2); i++) {
      imdbStars.pop();
      imdbStars.push(<StarOutlineIcon style={{ color: "#grey" }} />);
    }
    return (
      <Container className="my-3 singleMoviePage">
        <Row>
          <h1>{this.props.title}</h1>
          <Row>
            <Col md={3} className="d-flex align-items-center">
              <img
                src={currentMovie.Poster}
                className="img-fluid singleMoviePage__img"
                alt=""
              />
            </Col>
            <Col md={9}>
              <Row className="divider py-4">
                <Col
                  sm={8}
                  className="d-flex flex-column align-items-start divider"
                >
                  <h3>{currentMovie.Title}</h3>
                  <h6 className="mb-2">
                    {currentMovie.Year} - {currentMovie.Genre} -{" "}
                    {currentMovie.Runtime}{" "}
                  </h6>
                  <span className="d-flex mb-4">
                    <h5>
                      {imdbStars} {currentMovie.imdbRating}
                    </h5>
                  </span>
                  <p> {currentMovie.Plot}</p>
                  <Row className="d-flex flex-column align-items-start divider py-4">
                    <div className="mt-4 singleMovie__icons">
                      <PlayCircleFilledIcon
                        className="mr-3 ml-3"
                        style={{ fontSize: "2em" }}
                      />
                      <PlaylistAddIcon
                        className="mr-3"
                        style={{ fontSize: "2em" }}
                      />
                      <AddCommentIcon style={{ fontSize: "2em" }} />
                    </div>
                  </Row>
                </Col>

                <Col>
                  {" "}
                  <h6 className="mb-2">
                    <span className="details__span">Director:</span>{" "}
                    {currentMovie.Director}
                  </h6>
                  <h6 className="mb-2">
                    <span className="details__span">Writer:</span>{" "}
                    {currentMovie.Writer}
                  </h6>
                  <h6 className="mb-2">
                    <span className="details__span">Actors:</span>{" "}
                    {currentMovie.Actors}
                  </h6>
                  <h6 className="mb-2">
                    <span className="details__span">Rated:</span>{" "}
                    {currentMovie.Rated}
                  </h6>
                  <h6 className="mb-2">
                    <span className="details__span">Released:</span>{" "}
                    {currentMovie.Released}
                  </h6>
                  <h6 className="mb-2">
                    <span className="details__span">Country:</span>{" "}
                    {currentMovie.Country}
                  </h6>
                  <h6 className="mb-2">
                    <span className="details__span">Languages</span>{" "}
                    {currentMovie.Language}
                  </h6>
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>
        <Row>
          <CommentsList
            movieID={currentMovie.imdbID}
            updateComState={this.state.updateComments}
            updateComments={this.updateComments}
          />
          <AddComment
            img={currentMovie.Poster}
            movieID={currentMovie.imdbID}
            updateComments={this.updateComments}
          />
        </Row>
      </Container>
    );
  }
}
export default withRouter(showDetail);
