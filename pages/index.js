import React, { Component } from "react";
import Header from "./components/header";

const cURL = "http://localhost:2999";

class Index extends Component {
  state = {
    units: []
  };

  render() {
    return (
      <div className="bg-darkGray-800 h-screen  overflow-hidden">
        <Header />
      </div>
    );
  }
}

export default Index;
