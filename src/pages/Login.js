import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../data/api";

toast.configure();
class LoginIn extends Component {
  state = {
    username: "",
    password: "",
    token: "",
    isLoggedIn: "",
    message: "",
    admin: "",
    user: JSON.parse(localStorage.getItem("user")) || [],
  };
  notify = () => {};

  loginhandler = (e) => {
    e.preventDefault();

    login(this.state)
      .then((response) => {
        if (response.success === true) {
          this.state.username === "admin" && this.state.password === "admin"
            ? this.setState({ admin: "token" })
            : this.setState({ admin: null });

          var user = {
            username: this.state.username,
            token: response.token,
            isLoggedIn: true,
            message: "Login Successfull !!!",
            admin: this.state.admin,
          };

          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", response.token);
          this.setState({ isLoggedIn: true });
          toast.success("Logged In Successfull", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setTimeout(function () {
            window.location.href = "/";
            // if (
            //   this.state.isLoggedIn === true &&
            //   this.state.admin === "token"
            // ) {
            //   return (window.location.href = "/admin");
            // } else if (
            //   this.state.isLoggedIn === true &&
            //   this.state.admin === null
            // ) {
            //   return (window.location.href = "/");
            // }
          }, 2000);
        }
        if (response.success === false) {
          this.setState({
            message: response.message,
          });
          toast.error(response.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      })
      .catch((err) => {
        this.setState({
          message: err.response.message,
        });
        toast.error(err.response.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  render() {
    if (this.state.user.isLoggedIn === true) {
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
                  <b>LOGIN</b>
                </h3>
                <div className="row register-form">
                  <div className="col-md-7 login-form">
                    <form onSubmit={this.loginhandler}>
                      <div className="form-group">
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
                      </div>
                      <div className="form-group">
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
                      </div>
                      <input
                        type="submit"
                        className="btnRegister"
                        id="loginBtn"
                        value="Login"
                        onClick={this.notify}
                      />
                    </form>

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
