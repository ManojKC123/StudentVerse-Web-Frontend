import React, { Component, state, getUserData } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cssNumber } from "jquery";

toast.configure();

class LoginIn extends Component {
  state = {
    username: "",
    password: "",
    token: "",
    isLoggedIn: "",
    message: "",
  };
  notify = () => {
    toast.error(this.state.message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  getUserData = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  loginhandler = (e) => {
    e.preventDefault();
    axios
      .post("https://student-verse.herokuapp.com/login", this.state)
      .then((response) => {
        if (response.data.success === true) {
          console.log(response);
          var user = {
            username: this.state.username,
            token: response.data.token,
            isLoggedIn: true,
            message: "Login Success",
          };
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", response.data.token);
          window.location.href = "/";
        }
        if (response.data.success === false) {
          console.log("error login1", response.data.message);
          this.setState({
            message: response.data.message,
          });
        }
      })
      .catch((err) => {
        console.log("errorlogin2", err.response.data.message);
        console.log(err);
        this.setState({
          message: "Invalid Credentials",
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
                <div className="row register-form">
                  <div className="col-md-6 login-form">
                    <div className="form-group">
                      <form onSubmit={this.loginhandler}>
                        <input
                          type="text"
                          className="form-control"
                          id="usernamelogin"
                          value={this.state.username}
                          onChange={(event) => {
                            this.setState({
                              username: event.target.value,
                            });
                          }}
                          placeholder="Username"
                        />
                        <input
                          type="text"
                          className="form-control"
                          id="passwordlogin"
                          value={this.state.password}
                          onChange={(event) => {
                            this.setState({
                              password: event.target.value,
                            });
                          }}
                          placeholder="Password"
                        />
                        <input
                          type="submit"
                          className="btnRegister"
                          id="loginBtn"
                          value="LOGIN"
                          onClick={this.notify}
                        />
                      </form>
                    </div>

                    <div className="d-flex justify-content-center links">
                      <a href="/signup">
                        If you don't have account? <b>Go To SignUp</b>{" "}
                      </a>
                    </div>
                  </div>
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
