import React, { Component, state, Container } from "react";
import { getProfile } from "../data/api";

class UserProfile extends Component {
  state = {
    id: localStorage.getItem("userId"),
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
        <div className="row user-profile">
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-header bg-transparent text-center">
                <img
                  className="profile_img"
                  src="https://source.unsplash.com/600x300/?student"
                  alt="student dp"
                />
                <h3>{this.state.username}</h3>
                <a href="/user/update">
                  <p>Update your profile</p>
                </a>
              </div>
              <div className="card-body">
                <p className="mb-0">
                  <strong className="pr-1">First-Name:</strong>
                  {this.state.fname}
                </p>
                <p className="mb-0">
                  <strong className="pr-1">Last-Name:</strong>
                  {this.state.lname}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-header bg-transparent border-0">
                <h3 className="mb-0">
                  <i className="far fa-clone pr-1"></i>General Information
                </h3>
              </div>
              <div className="card-body pt-0">
                <table className="table table-bordered">
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
            <div className="card shadow-sm update-info">
              <div className="card-header bg-transparent border-0">
                <h3 className="mb-0">
                  <i className="far fa-clone pr-1"></i>Other Information
                </h3>
              </div>
              <div className="card-body pt-0">
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
