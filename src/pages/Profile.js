import React, { Component, state } from "react";
import { Col, Container, Row, Card, Table } from "react-bootstrap";
import axios from "axios";
import userprofile from "../media/user.png";
import { getProfile } from "../data/api";

class UserProfile extends Component {
  state = {
    id: "",
    fname: "",
    lname: "",
    username: "",
    address: "",
    mobile: "",
    email: "",
    profilepic: "",
    user: JSON.parse(localStorage.getItem("user")) || [],
  };

  componentDidMount() {
    getProfile(this.state.user.token)
      .then((response) => {
        if (response.success === true) {
          this.setState({
            fname: response.data.fname,
            lname: response.data.lname,
            username: response.data.username,
            email: response.data.email,
            profilepic: response.data.profilepic,
            mobile: response.data.mobile,
            address: response.data.address,
          });
        }
      })
      .catch((err) => {
        console.log("Profile Error", err);
      });
  }
  render() {
    return (
      <Container>
        <div class="row user-profile">
          <div class="col-lg-4">
            <div class="card shadow-sm">
              <div class="card-header bg-transparent text-center">
                <img
                  class="profile_img"
                  src="https://source.unsplash.com/600x300/?student"
                  alt="student dp"
                />
                <h3>{this.state.username}</h3>
                <a href="/update-profile/">
                  <p>Update your profile</p>
                </a>
              </div>
              <div class="card-body">
                <p class="mb-0">
                  <strong class="pr-1">First-Name:</strong>
                  {this.state.fname}
                </p>
                <p class="mb-0">
                  <strong class="pr-1">Last-Name:</strong>
                  {this.state.lname}
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="card shadow-sm">
              <div class="card-header bg-transparent border-0">
                <h3 class="mb-0">
                  <i class="far fa-clone pr-1"></i>General Information
                </h3>
              </div>
              <div class="card-body pt-0">
                <table class="table table-bordered">
                  <tr>
                    <th width="30%">Email</th>
                    <td width="2%">:</td>
                    <td>{this.state.email}</td>
                  </tr>
                  <tr>
                    <th width="30%">Address </th>
                    <td width="2%">:</td>
                    <td>{this.state.address}</td>
                  </tr>
                  <tr>
                    <th width="30%">Mobile</th>
                    <td width="2%">:</td>
                    <td>{this.state.mobile}</td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="card shadow-sm update-info">
              <div class="card-header bg-transparent border-0">
                <h3 class="mb-0">
                  <i class="far fa-clone pr-1"></i>Other Information
                </h3>
              </div>
              <div class="card-body pt-0">
                <p>Update information..</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
export default UserProfile;
