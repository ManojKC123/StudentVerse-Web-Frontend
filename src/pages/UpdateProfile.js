import React, { Component, Container } from "react";
import axios from "axios";
import { updateProfile } from "../data/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from "@material-ui/lab";
import Collapse from "@material-ui/core/Collapse";
import { IconButton } from "@material-ui/core";

import { Close } from "@material-ui/icons/";

toast.configure();

class UpdateProfile extends Component {
  state = {
    incorectAlert: false,
    incorrectMessage: "",
    fname: "",
    lname: "",
    username: "",
    address: "",
    mobile: "",
    email: "",
    profilepic: "",
    password: "",
    newPassword: "",
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
    console.log("update data", this.state);

    updateProfile(this.state, this.state.user.token)
      .then((response) => {
        console.log("update profile", response);

        if (response.success === false) {
          this.setState({ incorectAlert: true });
          this.setState({ incorrectMessage: response.message });
          toast.error("Profile Update Error !!!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
        if (response.success === true) {
          console.log("update result", response);
          this.setState({
            checkupdate: true,
          });
          toast.success("Profile Updated Successfully!!!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      })
      .catch((err) => {
        this.setState({ incorectAlert: true });
        this.setState({ incorrectMessage: err.message });
        console.log("Profile Update", err.response, err);
        toast.error("Profile Update Error!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.updateUserData}>
          <div className="row user-profile">
            <div className="col-lg-4">
              <div className="card shadow-sm">
                <div className="card-header bg-transparent text-center">
                  <img
                    className="profile_img"
                    src="https://source.unsplash.com/600x300/?student"
                    alt="student dp"
                  />
                  <h2>{this.state.username}</h2>
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
                  <table className="table">
                    <tr>
                      <th width="30%">Email:</th>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          id="update-email"
                          defaultValue={this.state.email}
                          onChange={(event) => {
                            this.setState({
                              email: event.target.value,
                            });
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th width="30%">Address: </th>
                      <td>
                        <input
                          defaultValue={this.state.address}
                          onChange={(event) => {
                            this.setState({
                              address: event.target.value,
                            });
                          }}
                          type="text"
                          className="form-control"
                          id="update-address"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th width="30%">Mobile:</th>
                      <td>
                        <input
                          defaultValue={this.state.mobile}
                          onChange={(event) => {
                            this.setState({
                              mobile: event.target.value,
                            });
                          }}
                          type="text"
                          className="form-control"
                          id="update-mobile"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th width="30%">Current Password:</th>
                      <td>
                        <input
                          onChange={(event) => {
                            this.setState({
                              password: event.target.value,
                            });
                            if (this.state.incorectAlert) {
                              this.setState({ incorectAlert: false });
                            }
                          }}
                          type="text"
                          className="form-control"
                          id="update-curentpasword"
                        />
                        <Collapse in={this.state.incorectAlert}>
                          <Alert
                            action={
                              <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                  this.setState({ incorectAlert: true });
                                }}
                              >
                                <Close fontSize="inherit" />
                              </IconButton>
                            }
                          >
                            InvalidC {this.state.incorrectMessage}
                          </Alert>
                        </Collapse>
                      </td>
                    </tr>
                    <tr>
                      <th width="30%">New Password:</th>
                      <td>
                        <input
                          defaultValue={this.state.newPassword}
                          onChange={(event) => {
                            this.setState({
                              newPassword: event.target.value,
                            });
                          }}
                          type="text"
                          className="form-control"
                          id="update-newpassword"
                        />
                      </td>
                    </tr>
                    <div>
                      <input
                        type="submit"
                        className="btn btn-primary center"
                        id="upProfileBtn"
                        value="Update Profile"
                        onClick={this.notify}
                      />
                    </div>
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
        </form>
      </div>
    );
  }
}

export default UpdateProfile;
