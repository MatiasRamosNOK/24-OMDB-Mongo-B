import React from "react";
import axios from "axios";

class MovieHomeUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match,
      information: { Poster: undefined },
      idUser: this.props.idUser,
    };
    this.obtenerInfo = this.obtenerInfo.bind(this);
  }

  eliminarPelicula(id) {
    axios.delete(`/users/${this.state.idUser}/${id}`).then((resp) => {
      if (resp.status == 200) {
        this.setState({ information: { Poster: undefined } });
      }
    });
  }

  obtenerInfo() {
    var info;
    axios
      .get(`http://omdbapi.com/?apikey=20dac387&i=${this.state.id}`)
      .then(function (response) {
        info = response.data;
      })
      .then(() => {
        this.setState({ information: info });
      });
  }

  componentDidMount() {
    this.obtenerInfo();
  }

  componentWillUnmount() {
    this.setState({ information: {} });
  }

  render() {
    return (
      <div>
        {this.state.information.Poster ? (
          <div>
            <img src={`${this.state.information.Poster}`} alt="Poster" />
            <h2>{this.state.information.Title}</h2>
            <button
              type="button"
              class="btn btn-danger"
              onClick={() => this.eliminarPelicula(this.state.id)}
            >
              Eliminar pelicula
            </button>
            <br />
          </div>
        ) : null}
      </div>
    );
  }
}

export default MovieHomeUser;
