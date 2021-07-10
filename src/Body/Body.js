import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import SignUp from './SignUp';
import UserProfile from './UserProfile';
class Body extends Component {
    render() {
        return (
          <div>
            <Route path='/signup' exact component={SignUp} />
            <Route path='/profile' exact component={UserProfile} />
          </div>
        );
    }
}
export default Body;