import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
// import Notification from "../components/Notification";
import { useSnackbar } from "notistack";

const LoginIn = () => {
  const [userLogin, setUserlogin] = React.useState({
    username: "",
    password: "",
    token: "",
    isLoggedIn: "false",
    message: "Login Failed",
  });
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);

  const { enqueueSnackbar } = useSnackbar();

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
