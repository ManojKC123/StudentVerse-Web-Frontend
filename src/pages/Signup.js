import React, { Component, registerUser } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class SignUp extends Component {
  state = {
    fname: "",
    lname: "",
    email: "",
    username: "",
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
  notify = () => {
    toast.error(this.state.message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  sendUserData = (e) => {
    e.preventDefault();
    // console.log("this is state" + this.state);
    const data = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      username: this.state.username,
      mobile: this.state.mobile,
      password: this.state.password,
      address: this.state.address,
    };

    axios
      .post("https://student-verse.herokuapp.com/signup", data)
      .then((response) => {
        console.log("this is response", response);
        console.log("this is response", response.data);

        this.setState({
          UserRegistered: true,
          message: response.data.message,
        });
      })
      .catch((err) => {
        console.log("signup error" + err);

        this.setState({
          message: "Invalid Data Entered",
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
                <div className="row register-form">
                  <div className="col-md-6">
                    <div className="form-group">
                      <form onSubmit={this.sendUserData}>
                        <input
                          type="text"
                          className="form-control"
                          id="firstnamesignup"
                          value={this.state.fname}
                          onChange={(event) => {
                            this.setState({ fname: event.target.value });
                          }}
                          placeholder="First Name"
                        />
                        <input
                          type="text"
                          className="form-control"
                          id="lastnamesignup"
                          value={this.state.lname}
                          onChange={(event) => {
                            this.setState({ lname: event.target.value });
                          }}
                          placeholder="Last Name"
                        />
                        <input
                          type="text"
                          className="form-control"
                          id="usernamesignup"
                          onChange={(event) => {
                            this.setState({ username: event.target.value });
                          }}
                          placeholder="Username"
                        />
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
                        <button
                          type="submit"
                          className="btnRegister"
                          id="signupBtn"
                          value="send"
                          onClick={this.notify}
                        />
                      </form>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex justify-content-center links">
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
      </div>
    );
  }
}
export default SignUp;
