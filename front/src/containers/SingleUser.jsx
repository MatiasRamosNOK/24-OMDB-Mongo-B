import React from "react";
import axios from "axios";
import MovieHomeUser from "../components/MovieHomeUser";
import store from "../redux/store";
import { fetchUserOne } from "../redux/actions/oneUserData";
import Jumbotron from "react-bootstrap/Jumbotron";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { removeMovie } from "../redux/actions/removeMovie";
class SingleUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.removeMovie = this.removeMovie.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
    store.dispatch(fetchUserOne(this.props.match));
  }

  removeMovie(idMovie) {
    var id = this.state.user.user.id;
    store.dispatch(removeMovie(id, idMovie));
    setTimeout(function () {
      store.dispatch(fetchUserOne(id));
    }, 1000);
  }

  componentDidUpdate() {
    console.log("Estado dentro de update:", this.state);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
      <div>
        <Jumbotron>
          {Object.keys(this.state.userOne.userOne).includes("email") ? (
            <div>
              <h1>Hello, this is the profile of:</h1>
              <h2>{this.state.userOne.userOne.email}</h2>
              <h3>Favourites movies:</h3>
              <div>
                {Object.keys(this.state.userOne.userOne).includes(
                  "moviesData"
                ) && this.state.userOne.userOne.moviesData.length >= 1 ? (
                  <Carousel id="myCarousel">
                    {this.state.userOne.userOne.moviesData.map(
                      (movie, index) => {
                        {
                          console.log("MOVIE ES:", movie);
                        }
                        if (movie.data.Response == "True") {
                          return (
                            <Carousel.Item key={movie.data.Title}>
                              <img
                                className="d-block w-100"
                                src={movie.data.Poster}
                              />

                              <Button
                                variant="danger"
                                size="lg"
                                block
                                onClick={(e) => {
                                  this.removeMovie(movie.data.imdbID);
                                }}
                              >
                                Delete
                              </Button>
                            </Carousel.Item>
                          );
                        }
                      }
                    )}
                  </Carousel>
                ) : (
                  <p>Nothing here</p>
                )}
              </div>
            </div>
          ) : null}
        </Jumbotron>
      </div>
    );
  }
}

export default SingleUser;
