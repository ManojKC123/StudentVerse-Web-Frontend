import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./css/style.css";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { Route } from "react-router-dom";
import LogIn from "./pages/Login";
import SignUp from "./pages/Signup";
import UserProfile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Hello app!</h1>
        <Route path="/login" exact component={LogIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/profile" exact component={UserProfile} />
      </div>
    </BrowserRouter>
  );
}

export default App;
