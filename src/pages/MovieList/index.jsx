import React, { Component } from "react";
import { Container, Button, Form, FormControl } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import ModalMovie from "../../containers/ModalMovie";
import MoviesRow from "../../containers/MoviesRow";

class MovieList extends Component {
  state = {
    show: false,
    currentMovie: [],
    searchQuery: "",
    showSearch: false,
    showSeries: false,
  };
  componentDidMount = async () => {
    this.setState({ showSeries: false });
    try {
      await this.handleSearch(this.props.match.params.series);
      if (this.props.match.params.series) {
        this.setState({ showseries: true });
      }
    } catch (e) {
      this.setState({ showSeries: false });
      console.log(e);
    }
  };

  handleOpenModal = async (movieID) => {
    this.setState({ show: true, currentMovie: movieID });
  };
  // ComponentDidUpdate = (prevState) => {
  //   if (prevState.searchQuery !== this.state.searchQuery) {
  //     this.setState({ showSearch: true});
  //   }
  // };
  handleCloseModal = () => {
    this.setState({ show: false, currentMovie: "" });
  };

  render() {
    let { show, currentMovie } = this.state;
    return (
      <div>
        {/* {console.log(this.props)} */}
        {!this.props.match.params.series && (
          <MoviesRow handleOpenModal={this.handleOpenModal} query="" />
        )}
        {this.props.match.params.series && (
          <MoviesRow
            handleOpenModal={this.handleOpenModal}
            query={this.props.match.params.series}
            series="Series"
          />
        )}
        {/* {this.state.showSearch ? (
          <>
            <MoviesRow
              handleOpenModal={this.handleOpenModal}
              query={this.state.searchQuery}
            />
          </>
        ) : (
          ""
        )} */}
        <ModalMovie
          handleClose={this.handleCloseModal}
          show={show}
          currentMovie={[...currentMovie]}
        ></ModalMovie>
      </div>
    );
  }
}
export default withRouter(MovieList);
