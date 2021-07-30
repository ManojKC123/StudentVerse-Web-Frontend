import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const LoginIn = () => {
  const [userLogin, setUserlogin] = React.useState({
    username: "",
    password: "",
    token: "",
    isLoggedIn: "",
    message: "",
  });

  const notify = () => {
    toast.error(this.state.message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const getFormData = (e, name) => {
    const tempData = userLogin;
    tempData[`${name}`] = e.target.value;
    setUserlogin(tempData);
  };

  const loginhandler = (e) => {
    e.preventDefault();
    const loginData = {
      username: userLogin.username,
      password: userLogin.password,
    };
    console.log("message check 0", userLogin.message);
    axios
      .post("https://student-verse.herokuapp.com/login", loginData)
      .then((response) => {
<<<<<<< HEAD
        console.log("login resp", response);
        var user = {
          username: userLogin.username,
          token: response.data.token,
          isLoggedIn: true,
        };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", response.data.token);

        setUserlogin({
          username: userLogin.username,
          token: response.data.token,
          isLoggedIn: true,
          message: "Login Success",
        });
        console.log("after login check", userLogin);
        // return (window.location.href = "/");
=======
        if (response.data.success === true) {
          console.log(response);
          var user = {
            username: this.state.username,
            token: response.data.token,
            isLoggedIn: true,
            message: response.data.message,
          };

          console.log("This is message", response.data.message);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", response.data.token);
          window.location.href = "/";
        }
        if (response.data.success === false) {
          this.setState({
            message: response.data.message,
          });
        }
        console.log("thsi is esdfa", this.state.message);
>>>>>>> dev
      })
      .catch((err) => {
        console.log(err);
      });
  };
<<<<<<< HEAD

  const notificationHandler = (variant) => () => {
    const gg = user.isLoggedIn;
    console.log("var", gg);
    enqueueSnackbar(` ${userLogin.message}`, gg, variant);
    console.log("after login check 2", userLogin);
  };

  useEffect(() => {
    if (user.isLoggedIn === true) {
      // return (window.location.href = "/");
    }
  }, []);

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
                  <form onSubmit={loginhandler}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        onChange={(e) => {
                          getFormData(e, "username");
                        }}
                        placeholder="Username"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="password"
                        onChange={(e) => {
                          getFormData(e, "password");
                          console.log(userLogin);
                        }}
                        placeholder="Password"
                      />
                    </div>
                    <Button
                      type="submit"
                      onClick={notificationHandler(userLogin.isLoggedIn)}
                      className="btnRegister"
                    >
                      Login
                    </Button>
                  </form>

                  <div className="d-flex justify-content-center links">
                    <a href="/signup">
                      If you don't have account? <b>Go To SignUp</b>{" "}
                    </a>
=======
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
>>>>>>> dev
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginIn;
