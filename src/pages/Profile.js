import React, { Component, state } from "react";
import { Col, Container, Row, Card, Table } from "react-bootstrap";
import axios from "axios";
import userprofile from "../media/user.png";

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
  render() {
    return (
      <Container>
        <Row>
          <Col md={4} sm={4} xs={12}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={userprofile} />
            </Card>
          </Col>
          <Col md={8} sm={4} xs={12}>
            <div className="user-details">
              <ul>
                <li>
                  <p>{this.state.username}</p>
                </li>
                <li>
                  <h3>
                    {this.state.fname} {this.state.lname}
                  </h3>
                </li>
                <li>
                  <p>{this.state.lname}</p>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="user-updated-details">
            <Table striped bordered hover variant="dark">
              <tbody>
                <tr>
                  <td>Address</td>
                  <td>{this.state.username}</td>
                </tr>
                <tr>
                  <td>Mobile</td>
                  <td>{this.state.mobile}</td>
                </tr>
                <tr>
                  <td>E-mail</td>
                  <td>{this.state.email}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default UserProfile;
