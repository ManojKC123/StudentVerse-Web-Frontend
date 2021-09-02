import React, { Component, Container } from "react";
import { loadSingleUser } from "../data/api";
import InfoIcon from "@material-ui/icons/Info";

class SingleUserProfile extends Component {
  state = {
    fname: "",
    lname: "",
    username: "",
    address: "",
    mobile: "",
    email: "",
    profilepic: "",
    user: JSON.parse(localStorage.getItem("user")) || [],
    userdata: [],
  };

  componentDidMount() {
    let userId = this.props.match.params.id;
    loadSingleUser(userId)
      .then((response) => {
        if (response.success === true) {
          console.log("user data", response.data);
          this.setState({ userdata: response.data });
        }
      })
      .catch((err) => {
        console.log("Profile Error", err);
      });
  }

  render() {
    console.log("user", this.state.userdata);

    return (
      <div className="container">
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
              </div>
              <div className="card-body">
                <p className="mb-0">
                  <strong className="pr-1">First-Name:</strong>
                  {this.state.userdata.fname}
                </p>
                <p className="mb-0">
                  <strong className="pr-1">Last-Name:</strong>
                  {this.state.userdata.lname}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-header bg-transparent border-0">
                <h3 className="mb-0">
                  <InfoIcon />
                  General Information
                </h3>
              </div>
              <div className="card-body pt-0">
                <table className="table table-bordered">
                  <tr>
                    <th width="30%">Email</th>
                    <td width="2%">:</td>
                    <td>{this.state.userdata.email}</td>
                  </tr>
                  <tr>
                    <th width="30%">Address </th>
                    <td width="2%">:</td>
                    <td>{this.state.userdata.address}</td>
                  </tr>
                  <tr>
                    <th width="30%">Mobile</th>
                    <td width="2%">:</td>
                    <td>{this.state.userdata.mobile}</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="card shadow-sm update-info">
              <div className="card-header bg-transparent border-0">
                <h3 className="mb-0">
                  <InfoIcon />
                  Other Information
                </h3>
              </div>
              <div className="card-body pt-0">
                <p>Update information..</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SingleUserProfile;
