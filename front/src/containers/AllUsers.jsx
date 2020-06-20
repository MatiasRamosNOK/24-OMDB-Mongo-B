import React from "react";
import store from "../redux/store";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { fetchUsers } from "../redux/actions/users";
import { fetchList } from "../redux/actions/filterList";

class AllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.onChangeUsers = this.onChangeUsers.bind(this);
    this.inicialState = this.inicialState.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
    store.dispatch(fetchUsers(this.state.user.user.id));
  }

  inicialState() {
    store.dispatch(fetchList(this.state.users.users));
  }

  onChangeUsers(e) {
    var user = e.target.value;
    var newList = [];
    if (user == "") {
      newList = this.state.users.users;
      store.dispatch(fetchList(newList));
    } else {
      newList = this.state.users.users.filter((x) => x.email.includes(user));
      store.dispatch(fetchList(newList));
    }
  }
  componentWillUnmount() {
    store.dispatch(fetchList(this.state.users.users));
    this.unsubscribe();
  }

  render() {
    {
      console.log("El estado es:", this.state);
    }
    return (
      <div>
        <div>
          <Navbar>
            <Link className="nav-item nav-link active" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>

            <Link
              className="nav-item nav-link"
              to={`/user/${this.state.user.user.id}`}
            >
              My profile
            </Link>

            <Link className="nav-item nav-link" to={`/user/lookUsers`}>
              Look for friends!
            </Link>

            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text style={{ color: "white" }}>
                Signed in as:
                <p style={{ color: "white" }}>{this.state.user.user.email}</p>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">User email:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Waiting..."
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => this.onChangeUsers(e)}
              onClick={() => this.inicialState()}
            />
          </InputGroup>
        </div>
        <ListGroup>
          {this.state.users.users.length > 0 ? (
            <div>
              {this.state.filterUser.list.map((user) => {
                return (
                  <ListGroup.Item>
                    <Link to={`/users/${user.id}`}>
                      <p style={{ color: "black" }}>{user.email}</p>
                    </Link>
                  </ListGroup.Item>
                );
              })}
            </div>
          ) : null}
        </ListGroup>
      </div>
    );
  }
}

export default AllUsers;
