import React, { Component } from 'react';
//import axios from 'axios';
class LoginIn extends Component {
  render() {
    return (
      <div className='container register'>
        <div className='row'>
          <div className='col-md-3 register-left'>
            <img src='https://image.ibb.co/n7oTvU/logo_white.png' alt='' />
            <h1>Welcome</h1>
            <p>Login the StudentsVerse Community</p>
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
                    <div className='col-md-6 login-form'>
                        <div className='form-group'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='First Name'
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Last Name'
                            />
                        </div>
                        <button type='submit' className='btnRegister' value='send'>Login</button>
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
