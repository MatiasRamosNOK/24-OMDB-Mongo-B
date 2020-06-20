import React from "react";
import { Link } from "react-router-dom";
import store from "../redux/store";
import { fetchMovie } from "../redux/actions/movie";
import axios from "axios";
import Favorites from "../components/Favorites";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
var obj;
class SingleMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
    store.dispatch(fetchMovie(this.props.match));
  }
  componentWillUnmount() {
    this.unsubscribe();
    store.dispatch(fetchMovie(""));
  }

  render() {
    {
      obj = this.state.movie.movie;
    }
    return (
      <div>
        {obj.Response == "True" ? (
          <div className="containerMovie">
            <div className="posterMovie">
              <Card>
                {obj.Poster != "N/A" ? (
                  <Card.Img variant="top" src={obj.Poster} />
                ) : (
                  <p>Image not found</p>
                )}
                <Card.Body>
                  <Card.Title style={{ color: "black" }}>
                    {obj.Title}
                  </Card.Title>
                  <Favorites id={obj.imdbID} />
                </Card.Body>
              </Card>
            </div>

            <div className="infoMovie">
              <ListGroup>
                <ListGroup.Item>Year: {obj.Year}</ListGroup.Item>
                <ListGroup.Item>Release: {obj.Release}</ListGroup.Item>
                <ListGroup.Item>Runtime: {obj.Runtime}</ListGroup.Item>
                <ListGroup.Item>Genre: {obj.Genre}</ListGroup.Item>
                <ListGroup.Item>Director: {obj.Director}</ListGroup.Item>
                <ListGroup.Item>Writer: {obj.Writer}</ListGroup.Item>
                <ListGroup.Item>Actors: {obj.Actors}</ListGroup.Item>
                <ListGroup.Item>Country: {obj.Country}</ListGroup.Item>
                <ListGroup.Item>Awards: {obj.Awards}</ListGroup.Item>
                <ListGroup.Item>imdbRating: {obj.imdbRating}</ListGroup.Item>
                <ListGroup.Item>imdbVotes: {obj.imdbVotes}</ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        ) : (
          <div className="spinnerDIV">
            <Spinner animation="border" variant="info" />
          </div>
        )}
      </div>
    );
  }
}
export default SingleMovie;
