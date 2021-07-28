import React, { Component, registerUser } from "react";
import axios from "axios";
class SignUp extends Component {
  state = {
    fname: "",
    lname: "",
    email: "",
    username: "",
    mobile: "",
    password: "",
    address: "",
  };
  registerUser = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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
      .post("http://localhost:5000/signup", data)
      .then()
      .catch((err) => {
        console.log("signup error" + err);
      });
  };
  render() {
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
                <div className="row register-form" onSubmit={this.sendUserData}>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        value={this.state.fname}
                        onChange={(event) => {
                          this.setState({ fname: event.target.value });
                        }}
                        placeholder="First Name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        value={this.state.lname}
                        onChange={(event) => {
                          this.setState({ lname: event.target.value });
                        }}
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={this.state.username}
                        onChange={(event) => {
                          this.setState({ username: event.target.value });
                        }}
                        placeholder="Username"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={this.state.password}
                        onChange={(event) => {
                          this.setState({ password: event.target.value });
                        }}
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
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
                        id="address"
                        value={this.state.address}
                        onChange={(event) => {
                          this.setState({ address: event.target.value });
                        }}
                        placeholder="Address"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="txtEmpPhone"
                        className="form-control"
                        id="mobile"
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
                      value="send"
                      onClick={this.sendUserData}
                    >
                      SignUp
                    </button>
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
