import React, { Component, Container } from "react";
import axios from "axios";
import { upProfile } from "../data/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  notify = () => {
    toast.error(this.state.message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
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
    console.log("update click");
    console.log(this.state);
    upProfile(this.state, this.state.user.token)
      .then((response) => {
        console.log(response);
        this.setState({
          checkupdate: true,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  render() {
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
                <input
                  type="text"
                  className="form-control"
                  id="updateUsername"
                  value={this.state.username}
                  onChange={(event) => {
                    this.setState({
                      username: event.target.value,
                    });
                  }}
                  placeholder="Username"
                />
              </div>
              <div className="card-body">
                <p className="mb-0">
                  <strong className="pr-1">First-Name:</strong>
                  <input
                    type="text"
                    className="form-control"
                    id="updateFnmae"
                    value={this.state.fname}
                    onChange={(event) => {
                      this.setState({
                        fname: event.target.value,
                      });
                    }}
                    placeholder="First-name"
                  />
                </p>
                <p className="mb-0">
                  <strong className="pr-1">Last-Name:</strong>
                  <input
                    type="text"
                    className="form-control"
                    id="updateLname"
                    value={this.state.lname}
                    onChange={(event) => {
                      this.setState({
                        lname: event.target.value,
                      });
                    }}
                    placeholder="Last-name"
                  />
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
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        id="updateEmail"
                        value={this.state.email}
                        onChange={(event) => {
                          this.setState({
                            email: event.target.value,
                          });
                        }}
                        placeholder="E-mail"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th width="30%">Address </th>
                    <td width="2%">:</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        id="updateAddress"
                        value={this.state.address}
                        onChange={(event) => {
                          this.setState({
                            address: event.target.value,
                          });
                        }}
                        placeholder="Address"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th width="30%">Mobile</th>
                    <td width="2%">:</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        id="updateMobile"
                        value={this.state.mobile}
                        onChange={(event) => {
                          this.setState({
                            mobile: event.target.value,
                          });
                        }}
                        placeholder="Mobile"
                      />
                    </td>
                  </tr>
                  <tr>
                    <input
                      type="submit"
                      className="btnupProfile"
                      id="upProfileBtn"
                      value="Submit"
                      onClick={this.notify}
                      onSubmit={this.updateUserData}
                    />
                  </tr>
                </table>
              </div>
            </div>
            <div className="card shadow-sm update-info">
              <div className="card-header bg-transparent border-0">
                <h3 className="mb-0">
                  <i className="far fa-clone pr-1">Other Incormation</i>
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

export default UpdateProfile;
