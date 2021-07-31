import React, { Component } from "react";
import axios from "axios";

class UpdateProfile extends Component {
  state = {
    fname: "",
    lname: "",
    username: "",
    address: "",
    mobile: "",
    email: "",
    profilepic: "",
    checkupdate: false,
    id: this.props.match.params.id,
    config: {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    },
    user: JSON.parse(localStorage.getItem("user")) || [],
  };

  componentDidMount() {
    axios
      .get("https://student-verse.herokuapp.com/profile", this.state.config)
      .then((response) => {
        this.setState({
          fname: response.data.data.fname,
          lname: response.data.data.lname,
          username: response.data.data.username,
          email: response.data.data.email,
          profilepic: response.data.data.profilepic,
          mobile: response.data.data.mobile,
          address: response.data.data.address,
        });
      })
      .catch((err) => {
        console.log("PROF ERROR", err);
      });
  }

  updateUserData = (e) => {
    e.preventDefault();
    axios
      .put(
        "https://student-verse.herokuapp.com/profileUpdate",
        this.state,
        this.state.config
      )
      .then((response) => {
        this.setState({
          checkupdate: true,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  render() {
    if (this.state.checkupdate === true) {
      return (window.location.href = "/profile");
    }
    return <div>this is profile update</div>;
  }
}

export default UpdateProfile;
