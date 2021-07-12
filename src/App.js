import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter } from "react-router-dom";
import "./css/style.css";
import Body from "./Body/Body";
import Login from "./Body/LoginIn";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Hello app!</h1>
        <Body />
        <Login />
      </div>
    </BrowserRouter>
  );
}

export default App;
