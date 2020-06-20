import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import store from "../redux/store";
import { fetchUser } from "../redux/actions/user";
import Button from "react-bootstrap/Button";
class NavBarUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
    store.dispatch(fetchUser());
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    {
      console.log("El estado quedo asi:", this.state);
    }
    return (
      <div>
        {this.state.user.user != "" ? (
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
              <Navbar.Text style={{ color: "white", marginRight: "10px" }}>
                Welcome {this.state.user.user.email}
              </Navbar.Text>
              <a href="/logout">
                <Button variant="info">Logout</Button>
              </a>
            </Navbar.Collapse>
          </Navbar>
        ) : (
          <div>
            <Nav variant="pills" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link>
                  <Link to={"/users/login"} style={{ color: "#f0ffff" }}>
                    Login
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link style={{ color: "#f0ffff" }}>
                  <Link to={"/users/register"} style={{ color: "#f0ffff" }}>
                    Register
                  </Link>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        )}
      </div>
    );
  }
}
export default NavBarUser;
