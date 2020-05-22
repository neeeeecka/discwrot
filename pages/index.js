import React, { Component } from "react";
import SideBar from "./components/sideBar";

const cURL = "http://localhost:2999";

class Index extends Component {
  state = {
    units: []
  };

  render() {
    return (
      <div className="bg-darkGray-700 flex h-screen overflow-hidden">
        <SideBar />
      </div>
    );
  }
}

export default Index;
