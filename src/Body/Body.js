import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import SignUp from './SignUp';
class Body extends Component {
    render() {
        return (
            <div>
                <Route path="/signup" exact component={SignUp} />
                </div>
        )
    }
}
export default Body;