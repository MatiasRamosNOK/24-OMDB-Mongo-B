import React from "react";
import store from "../redux/store";
import { Link } from "react-router-dom";
import { fetchMovies } from "../redux/actions/movies";
import SingleMovie from "../components/SingleMovie";
import User from "../components/User";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { connect } from "react-redux";
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  changeHandler(e) {
    e.preventDefault();
    store.dispatch(fetchMovies(e.target.value));
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <User />
        <br></br>

        <div id="inputUser">
          <label htmlFor="basic-url">Hola!, ¿Que deseas buscar?</label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Movie:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Waiting..."
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => {
                this.changeHandler(e);
              }}
            />
          </InputGroup>
        </div>

        <div id="contenido">
          {this.state.movies.Search.Response == "True"
            ? this.state.movies.Search.Search.map((movie) => {
                return (
                  <div key={movie.imdbID} className="contenedorMovie">
                    <Link to={`/movie/${movie.imdbID}`}>
                      <Card style={{ width: "18rem", height: "28rem" }}>
                        <Card.Img variant="top" src={movie.Poster} />
                        <Card.Body
                          style={{
                            backgroundColor: "#403c3a",
                            color: "#f0ffff",
                          }}
                        >
                          <Card.Title>{movie.Title}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Link>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}
export default Main;
