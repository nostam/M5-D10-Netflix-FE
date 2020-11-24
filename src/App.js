import React from "react";
import { Modal } from "react-bootstrap";
// import { Link, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MovieList from "./components/MovieList";
import ModalMovie from "./components/ModalMovie";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import SinlgeMoviePage from "./components/SinlgeMoviePage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends React.Component {
  // state = {
  //   loading: true,
  // };
  // componentDidMount = async () => {
  //   this.setState({ loading: false });
  // };
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar title={} />

          {/* <Switch>
              <Route exact path="/">
                <MovieList />
                <ModalMovie />
              </Route>

              <Route exact path="/movie/:id">
                <SinlgeMoviePage />
              </Route>
            </Switch> */}
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
