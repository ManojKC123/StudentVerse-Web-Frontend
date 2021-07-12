import React, { Component, state, getUserData } from 'react';
import axios from 'axios';
import { event } from 'jquery';
class LoginIn extends Component {
  state = {
    username: '',
    password: '',
    checklogin: '',
    message: '',
  };

  getUserData = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  loginhandler = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/login', this.state)
      .then((response) => {
        console.log(response);
        var user = {
          username: this.state.username,
          token: this.state.token,
          checklogin: true,
        };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', response.data.token);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          message: err.response.data.message,
        });
      });
  };
  render() {
    if (this.state.message) {
      var message = this.state.message;
    }

    if (this.state.checklogin === true) {
      return (window.location.href = '/');
    }
    return (
      <div className='container register'>
        <div className='row'>
          <div className='col-md-3 register-left'>
            <img src='https://image.ibb.co/n7oTvU/logo_white.png' alt='' />
            <h1>Welcome</h1>
            <p>Login into StudentsVerse Community</p>
          </div>
          <div className='col-md-9 register-right'>
            <div className='tab-content' id='myTabContent'>
              <div
                className='tab-pane fade show active'
                id='home'
                role='tabpanel'
                aria-labelledby='home-tab'
              >
                <h3 className='register-heading'>
                  <b>Login</b>
                </h3>
                <div className='row register-form'>
                  <p>{message}</p>
                  <div className='col-md-6 login-form'>
                    <div className='form-group'>
                      <input
                        type='text'
                        className='form-control'
                        id='username'
                        value={this.state.username}
                        onChange={(event) => {
                          this.setState({
                            username: event.target.value,
                          });
                        }}
                        placeholder='Username'
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        type='text'
                        className='form-control'
                        id='username'
                        value={this.state.password}
                        onChange={(event) => {
                          this.setState({
                            password: event.target.value,
                          });
                        }}
                        placeholder='Password'
                      />
                    </div>
                    <button
                      type='submit'
                      className='btnRegister'
                      value='send'
                      onClick={this.loginhandler}
                    >
                      Login
                    </button>
                    <div className='d-flex justify-content-center links'>
                      <a href='/'>
                        If you don't have account? <b>Go To SignUp</b>{' '}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginIn;
