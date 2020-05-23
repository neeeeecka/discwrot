import React, { Component } from "react";
import SideBar from "./components/sideBar";

const cURL = "http://localhost:2999";

class Index extends Component {
  state = {
    user: { name: "White_Stardust", uid: "992" },
    units: []
  };

  render() {
    return (
      <div className="bg-darkGray-700 flex h-screen overflow-hidden">
        <SideBar user={this.state.user} />
      </div>
    );
  }
}

export default Index;
