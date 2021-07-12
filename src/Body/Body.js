import React, { Component } from "react";
import { Route } from "react-router-dom";
import LoginIn from "./LoginIn";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile";
class Body extends Component {
  render() {
    return (
      <div>
        <h1>Hello world</h1>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/profile" exact component={UserProfile} />
        <Route path="/login" exact component={LoginIn} />
      </div>
    );
  }
}
export default Body;
