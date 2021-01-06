import React, { Component } from "react";
import { Row, Container, Spinner, Alert } from "react-bootstrap";

import SortIcon from "@material-ui/icons/Sort";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 3,
  swipeToSlide: true,
  lazyLoad: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 992,
      settings: { slidesToShow: 4, slidesToScroll: 4 },
    },
    { breakpoint: 1100, settings: "unslicks" },
  ],
};
export default class MoviesRow extends Component {
  state = {
    movies: [],
    sorted: true,
    loading: true,
  };

  componentDidMount = async () => {
    this.fetchMovies();
    // console.log(this.state.movies);
  };
  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.query !== this.props.query) {
      this.fetchMovies(this.props.query);
    }
    // console.log(this.state.movies);
  };
  sortByYear = () => {
    let { movies } = this.state;
    let moviesByYear = movies.sort(
      (movie1, movie2) => movie1.Year - movie2.Year
    );
    this.setState({ movies: moviesByYear, sorted: true });
  };
  urlOptions = () => {
    const url = process.env.REACT_APP_API_URL;
    if (this.props["series"]) {
      return `${url}/media?title=${this.props.query}`;
    }

    return `${url}/media`;
  };
  handleSlidesToShow = () => {
    return this.state.movies.length < 6 ? 3 : 6;
  };
  // omdb s
  fetchMovies = async () => {
    try {
      let res = await fetch(this.urlOptions());
      console.log(this.urlOptions());
      if (res.ok) {
        let data = await res.json();
        console.log(data);
        settings.slidesToShow = data.length < 6 ? data.length : 6;
        this.setState({ movies: data });
        setTimeout(() => this.setState({ loading: false }), 1000); // TODO individual img loading spinner
      }
    } catch (e) {
      this.setState({ loading: false });
      console.log(e);
    }
  };
  render() {
    let { movies } = this.state;
    return (
      <>
        {!this.state.loading ? (
          <Container
            style={{ width: "90vw" }}
            className="mb-4"
            fluid
            style={{ overflowX: "hidden" }}
          >
            <Row className="d-flex align-items-center justify-content-between px-5">
              <h3 className="movieRowTitle text-capitalize text-white my-3">
                {!this.props.query ? "Library" : ""}
                {this.props.series ? this.props.series + " for " : ""}
                {this.props.query}
              </h3>
              <SortIcon
                onClick={() => this.sortByYear()}
                style={{ color: "white", cursor: "pointer" }}
              />
            </Row>

            <Slider {...settings}>
              {movies.map((movie) => (
                <div
                  className="movieRowImg"
                  key={movie.imdbID}
                  onClick={() => this.props.handleOpenModal(movie.imdbID)}
                >
                  <img
                    className="img-fluid"
                    src={movie.Poster}
                    alt="movie-poster"
                  />
                </div>
              ))}
            </Slider>
          </Container>
        ) : (
          <Container className="my-5">
            <Alert
              variant="warning"
              className="d-flex text-center justify-content-center"
            >
              <h4>Loading {this.props.query} Movies</h4>
              <Spinner animation="border" role="status" variant="warning">
                <span className="sr-only">Loading Posters...</span>
              </Spinner>
            </Alert>
          </Container>
        )}
      </>
    );
  }
}
