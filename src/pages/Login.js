import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class LoginIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoggedIn: "false",
      message: "",
    };
  }
  notify = () => {
    toast.error(this.state.message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  loginhandler = (e) => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post("https://student-verse.herokuapp.com/login", data)
      .then((response) => {
        console.log("login response", response);
        var user = {
          username: this.state.username,
          token: response.data.token,
          isLoggedIn: true,
        };
        this.setState({
          message: response.data.message,
        });
        console.log(response.data.userID);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", response.data.token);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          message: err.response.data.message,
        });
      });
  };
  render() {
    if (this.state.isLoggedIn === true) {
      return (window.location.href = "/");
    }
    return (
      <div className="container register">
        <div className="row">
          <div className="col-md-3 register-left">
            <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
            <h1>Welcome</h1>
            <p>Login into StudentsVerse Community</p>
          </div>
          <div className="col-md-9 register-right">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <h3 className="register-heading">
                  <b>Login</b>
                </h3>
                <div className="row">
                  <form onSubmit={this.loginhandler}>
                    <div className="col-md-6 login-form">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          value={this.state.username}
                          onChange={(event) => {
                            this.setState({
                              username: event.target.value,
                            });
                          }}
                          placeholder="Username"
                          required=""
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="password"
                          value={this.state.password}
                          onChange={(event) => {
                            this.setState({
                              password: event.target.value,
                            });
                          }}
                          placeholder="Password"
                          required=""
                        />
                      </div>

                      <button
                        type="submit"
                        value="LOGIN"
                        onClick={this.notify}
                      />

                      <div className="d-flex justify-content-center links">
                        <a href="/signup">
                          If you don't have account? <b>Go To SignUp</b>{" "}
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginIn;
