import React, { Component } from "react";
import "../styles/App.css";
import Hangman from "./Hangman";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Hangman/>
      </div>
    );
  }
}

export default App;
