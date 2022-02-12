import { render } from "react-dom";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import MainClass from "./components/mainClass";
import MainFunctional from "./components/mainFunctional";
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <MainClass /> */}
        <MainFunctional />
      </div>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById("root"));
render(<App />, document.getElementById("root"));
