import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./css/style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import LogIn from "./pages/Login";
import SignUp from "./pages/Signup";
import UserProfile from "./pages/Profile";
import Home from "./pages/Home";
import AskQuestion from "./pages/AskQuestion";
import Layout from "./Layout/Layout";
import SingleQuestion from "./pages/SingleQuestion";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>
            <Route path="/login" component={LogIn} exact />
            <Route path="/signup" component={SignUp} exact />
            <Route path="/profile" component={UserProfile} exact />
            <Route path="/ask-question" component={AskQuestion} exact />
            <Route path="/" component={Home} exact />
            <Route path="/questions/:id" component={SingleQuestion} exact />
            <Route path="/user/update" component={UpdateProfile} exact />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
