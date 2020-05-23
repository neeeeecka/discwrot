import React, { Component } from "react";
import SideBar from "./components/sideBar";

const cURL = "http://localhost:2999";

class Index extends Component {
  state = {
    user: {
      name: "White_Stardust",
      uid: "992",
      status: "Раздаю бонус коды на 279р"
    },
    units: [],
    mainPageVisible: true
  };
  openSettings = () => {
    this.setState({ mainPageVisible: false });
  };
  render() {
    return (
      <div className="relative overflow-hidden">
        <div
          className={
            "bg-darkGray-700 flex h-screen overflow-hidden ease duration-150 transition-all" +
            (this.state.mainPageVisible
              ? " opacity-100 scale-anim-100"
              : " opacity-0 scale-anim-95 pointer-events-none")
          }
        >
          <SideBar user={this.state.user} openSettings={this.openSettings} />
        </div>
        <div
          className={
            "absolute top-0 left-0 w-full bg-darkGray-700 flex h-screen overflow-hidden ease duration-150 transition-all" +
            (this.state.mainPageVisible
              ? " opacity-0 scale-anim-115 pointer-events-none"
              : " opacity-100 scale-anim-100")
          }
        >
          <span className="">Settings</span>
        </div>
      </div>
    );
  }
}

export default Index;
