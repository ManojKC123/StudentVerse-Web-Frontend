import React, { Component, Container } from "react";
import axios from "axios";
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
    // axios
    //   .get("https://student-verse.herokuapp.com/profile", this.state.config)
    //   .then((response) => {
    //     this.setState({
    //       fname: response.data.data.fname,
    //       lname: response.data.data.lname,
    //       username: response.data.data.username,
    //       email: response.data.data.email,
    //       profilepic: response.data.data.profilepic,
    //       mobile: response.data.data.mobile,
    //       address: response.data.data.address,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log("PROF ERROR", err);
    //   });
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
    return (
      <div className="conainer">
        <div class="row user-profile">
          <div class="col-lg-4">
            <div class="card shadow-sm">
              <div class="card-header bg-transparent text-center">
                <img
                  class="profile_img"
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
              <div class="card-body">
                <p class="mb-0">
                  <strong class="pr-1">First-Name:</strong>
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
                <p class="mb-0">
                  <strong class="pr-1">Last-Name:</strong>
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
          <div class="col-lg-8">
            <div class="card shadow-sm">
              <div class="card-header bg-transparent border-0">
                <h3 class="mb-0">
                  <i class="far fa-clone pr-1"></i>General Information
                </h3>
              </div>
            </div>
            <div class="card shadow-sm update-info">
              <div class="card-header bg-transparent border-0">
                <h3 class="mb-0">
                  <i class="far fa-clone pr-1">Other Incormation</i>
                </h3>
              </div>
              <div class="card-body pt-0">
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
