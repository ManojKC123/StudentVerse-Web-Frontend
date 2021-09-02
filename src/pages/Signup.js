import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signup } from "../data/api";

toast.configure();
class SignUp extends Component {
  state = {
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
    address: "",
    user: JSON.parse(localStorage.getItem("user")) || [],
    message: "",
    UserRegistered: "false",
  };

  registerUser = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  sendUserData = (e) => {
    e.preventDefault();
    const data = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      mobile: this.state.mobile,
      password: this.state.password,
      address: this.state.address,
    };

    signup(data)
      .then((response) => {
        console.log("signup resp", response.success);
        console.log("signup resp2", response.error[0].msg);

        if (response.success === true) {
          console.log("signup resp2", response.data, response);
          this.setState({
            UserRegistered: true,
            message: response.data.message,
          });
          const uNameE = data.email.substring(0, data.email.indexOf("@"));
          toast.info("Your username is " + uNameE, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 1,
          });
          toast.success("SignUp Succesfull !!!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setTimeout(function () {
            window.location.href = "/login";
          }, 4000);
        }
        console.log("false check", response.success);
        if (response.success === false) {
          console.log("false check", response);

          // console.log("signupfalseerr", response.error[0].msg);
          // console.log("signupfalseerr 2", response.error.msg);
          this.setState({ message: response.error[0].msg });
          toast.error(this.state.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      })
      .catch((err) => {
        console.log("signup Error " + err);
        this.setState({
          message: "Invalid Data Entered",
        });
        toast.error(err.msg, {
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
            <p>Join the StudentsVerse Community</p>
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
                  <b>CREATE AN ACCOUNT</b>
                </h3>
                <div className="row justify-content-md-center register-form">
                  <div className="col-md-11">
                    <form onSubmit={this.sendUserData}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-half"
                          id="firstnamesignup"
                          value={this.state.fname}
                          onChange={(event) => {
                            this.setState({ fname: event.target.value });
                          }}
                          placeholder="First Name"
                        />
                        <input
                          type="text"
                          className="form-control form-half"
                          id="lastnamesignup"
                          value={this.state.lname}
                          onChange={(event) => {
                            this.setState({ lname: event.target.value });
                          }}
                          placeholder="Last Name"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          id="emailsignup"
                          value={this.state.email}
                          onChange={(event) => {
                            this.setState({ email: event.target.value });
                          }}
                          placeholder="Email"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="addresssignup"
                          value={this.state.address}
                          onChange={(event) => {
                            this.setState({ address: event.target.value });
                          }}
                          placeholder="Address"
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: "0" }}>
                        <input
                          type="password"
                          className="form-control"
                          id="passwordsignup"
                          value={this.state.password}
                          onChange={(event) => {
                            this.setState({ password: event.target.value });
                          }}
                          placeholder="Password"
                        />
                        <label for="passwordsignup" style={{ color: "grey" }}>
                          6-15 characters, 1 uppercase, 1 special character, 1
                          number
                        </label>
                        {/* <p>
                          Password hint: 6-15 characters, 1 uppercase, 1 special
                          character, 1 number
                        </p> */}
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="txtEmpPhone"
                          className="form-control"
                          id="mobilesignup"
                          value={this.state.mobile}
                          onChange={(event) => {
                            this.setState({ mobile: event.target.value });
                          }}
                          placeholder="Mobile"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btnRegister"
                        id="signupBtn"
                        value="Register"
                      >
                        Register
                      </button>
                    </form>
                    <a href="/login">
                      Already Have Account? <b>Go To Login</b>
                    </a>
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
export default SignUp;
