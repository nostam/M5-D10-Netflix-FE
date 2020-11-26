import React from "react";
// import { Link, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ShowDetail from "./components/ShowDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Registration from "./components/Registration";
class App extends React.Component {
  render() {
    return (
      <Router className="App">
        <NavBar title="Strivix" />
        <Route path="/" exact component={MovieList} />
        <Route
          path="/movie/:id"
          render={(props) => <ShowDetail title="Movie Details" {...props} />}
        />
        <Route
          path="/series/:series"
          render={(props) => <MovieList {...props} />}
        />
        <Route
          path="/register"
          exact
          render={(props) => <Registration {...props} />}
        />
        <Footer />
      </Router>
    );
  }
}

export default App;
