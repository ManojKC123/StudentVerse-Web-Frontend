import React, { Component } from "react";
import {
  updateProfile,
  updatePassword,
  getProfile,
  updatePP,
} from "../data/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import { IconButton } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { Close } from "@material-ui/icons/";

toast.configure();

class UpdateProfile extends Component {
  state = {
    incorectAlert: false,
    incorectCPAlert: false,
    incorrectMessage: "",
    updateDrop: false,
    fname: "",
    lname: "",
    username: "",
    address: "",
    mobile: "",
    email: "",
    profilepic: "",
    password: "",
    upCurrentpassword: "",
    newPassword: "",
    confirmNewPassword: "",
    checkupdate: false,
    id: this.props.match.params.id,
    config: {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    },
    user: JSON.parse(localStorage.getItem("user")) || [],
    picture: "",
    profilename: "",
  };

  notify = () => {
    toast.error(this.state.message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  componentDidMount() {
    console.log("response updatePassword");

    getProfile(this.state.user.token)
      .then((response) => {
        console.log("response updatePassword", response);
        if (response.success === true) {
          this.setState({
            fname: response.data.fname,
            lname: response.data.lname,
            username: response.data.username,
            email: response.data.email,
            profilepic: response.data.profilepic,
            mobile: response.data.mobile,
            address: response.data.address,
            profilename: response.data.profilename,
          });
        }
      })
      .catch((err) => {
        console.log("Profile Error", err);
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

  updateProfilePassword = (e) => {
    e.preventDefault();
    if (this.state.confirmNewPassword !== this.state.newPassword) {
      toast.error("Confirm and New password not match!!!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      this.setState({ newPassword: "", confirmNewPassword: "" });
      return;
    }
    updatePassword(this.state, this.state.user.token)
      .then((response) => {
        if (response.success === false) {
          this.setState({ incorectCPAlert: true });
          this.setState({ incorrectMessage: response.message });
          this.setState({ upCurrentpassword: "" });
          toast.error("Password Update Error !!!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
        if (response.success === true) {
          console.log("update result", response.data);
          this.setState({
            checkupdate: true,
          });
          toast.success("Password Updated Successfully!!!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      })
      .catch((err) => {
        this.setState({ incorectAlert: true });
        this.setState({ incorrectMessage: err.message });
        console.log("Password Update error", err.response, err);
        toast.error("Profile Update Error!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  updateProfilePic = (e) => {
    e.preventDefault();
    console.log("piccheck cons", this.state.picture);

    const pictureUpd = new FormData();
    const picture = this.state.picture;
    pictureUpd.append("picture", picture);
    console.log("piccheck", pictureUpd);

    updatePP(pictureUpd, this.state.user.token)
      .then((response) => {
        if (response.success === false) {
          this.setState({ incorrectMessage: response.message });
          toast.error(response.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
        if (response.success === true) {
          console.log("update result", response);
          toast.success(response.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      })
      .catch((err) => {
        toast.error("Profile Update Error!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  dropUpdatePassword = (e) => {
    e.preventDefault();
    this.setState({ updateDrop: !this.state.updateDrop });
  };

  render() {
    return (
      <div className="container">
        <div className="row user-profile">
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-header bg-transparent text-center">
                <div>
                  <img
                    className="profile_img"
                    src={`https://student-verse.herokuapp.com/userprofile/${this.state.profilename}`}
                    alt="student dp"
                  />
                </div>
                <div className="upload-PP">
                  <label for="files" className="blue">
                    Upload Picture
                  </label>
                  <input
                    id="files"
                    className={this.state.picture ? "" : "none"}
                    type="file"
                    onChange={(e) => {
                      this.setState({ picture: e.target.files[0] });
                      console.log("pic_onchange", e.target.files[0]);
                    }}
                  />
                </div>
                {this.state.picture ? (
                  <button
                    onClick={(e) => {
                      this.updateProfilePic(e);
                    }}
                    className="btn
                    btn-primary"
                  >
                    Update Picture
                  </button>
                ) : null}
                <h2>{this.state.username}</h2>
              </div>
              <div className="card-body">
                <p className="mb-0">
                  <strong className="pr-1">First-Names:</strong>
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
                  <InfoIcon />
                  General Information
                </h3>
              </div>
              <div className="card-body pt-0">
                <form onSubmit={this.updateUserData}>
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
                                  this.setState({ incorectAlert: false });
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

                    <div>
                      <input
                        type="submit"
                        className="btn btn-primary center btnUpdate"
                        id="upProfileBtn"
                        value="Update Profile"
                        onClick={this.notify}
                      />
                    </div>
                  </table>
                </form>
                <div className="update-password-section">
                  <button
                    className="btn-update-password"
                    onClick={this.dropUpdatePassword}
                  >
                    Update Password
                  </button>
                  <div
                    className={
                      this.state.updateDrop
                        ? "update-password-inputs show"
                        : "update-password-inputs"
                    }
                  >
                    <input
                      placeholder="Current Password"
                      value={this.state.upCurrentpassword}
                      onChange={(event) => {
                        this.setState({
                          upCurrentpassword: event.target.value,
                        });
                        console.log("up", this.state.upCurrentpassword);
                      }}
                      type="text"
                      className="form-control update-pass-input"
                      id="update-mobile"
                    />
                    <Collapse in={this.state.incorectCPAlert}>
                      <Alert
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                              this.setState({ incorectCPAlert: false });
                            }}
                          >
                            <Close fontSize="inherit" />
                          </IconButton>
                        }
                      >
                        {this.state.incorrectMessage}
                      </Alert>
                    </Collapse>
                    <input
                      placeholder="New Password"
                      value={this.state.newPassword}
                      onChange={(event) => {
                        this.setState({
                          newPassword: event.target.value,
                        });
                        console.log("up", this.state.newPassword);
                      }}
                      type="text"
                      className="form-control update-pass-input"
                      id="update-mobile"
                    />
                    <input
                      placeholder="Confirm New Password"
                      value={this.state.confirmNewPassword}
                      onChange={(event) => {
                        this.setState({
                          confirmNewPassword: event.target.value,
                        });
                        console.log("up", this.state.confirmNewPassword);
                      }}
                      type="text"
                      className="form-control update-pass-input"
                      id="update-mobile"
                    />
                    <button
                      className="btn btn-primary"
                      id="upPasswordBtn"
                      onClick={this.updateProfilePassword}
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card shadow-sm update-info">
              <div className="card-header bg-transparent border-0">
                <h3 className="mb-0">
                  <InfoIcon /> Other Incormation
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
