import React, { Component, state } from 'react';
import { Col, Container, Row, Card, Table } from 'react-bootstrap';
import axios from 'axios';
import userprofile from '../media/user.png';

class UserProfile extends Component {
  state = {
    id: localStorage.getItem('userId'),
    fname: '',
    lname: '',
    username: '',
    address: '',
    mobile: '',
    email: '',
    profilepic: '',
    config: {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
    },
  };

  componentDidMount() {
    const userName = user.username;
    axios
      .get(`http://localhost:5000/user/${userName}`)
      .then((response) => {
        setUserDetailsPic(response.data.data);
        console.log('use profile', userDetails);
      })
      .catch((err) => {
        console.log('PROF ERROR', err);
      });
  }
  render() {
    return (
      <Container>
        <Row>
          <Col md={4} sm={4} xs={12}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant='top' src={userprofile} />
            </Card>
          </Col>
          <Col md={8} sm={4} xs={12}>
            <div className='user-details'>
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
          <Col className='user-updated-details'>
            <Table striped bordered hover variant='dark'>
              {/* <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                </tr>
              </thead> */}
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
