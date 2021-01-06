import React from "react";
// import { Link, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MovieList from "./pages/MovieList";
import Footer from "./components/Footer";
import NavBar from "./containers/NavBar";
import ShowDetail from "./pages/ShowDeatils";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Registration from "./pages/Registration";
class App extends React.Component {
  state = { searchQuery: null };
  render() {
    return (
      <Router className="App">
        <NavBar title="Strivix" searchQuery={this.state.searchQuery} />
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
