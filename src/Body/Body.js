import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import LoginIn from './LoginIn';
import SignUp from './SignUp';
class Body extends Component {
    render() {
        return (
          <div>
            <Route path='/signup' exact component={SignUp} />
            <Route path='/login' exact component={LoginIn} />
          </div>
        );
    }
}
export default Body;