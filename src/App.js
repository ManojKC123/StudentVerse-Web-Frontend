import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter } from "react-router-dom";
import "./css/style.css";
import Body from "./Body/Body";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Body></Body>
      </div>
    </BrowserRouter>
  );
}

export default App;
