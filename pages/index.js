import React, { Component } from "react";
import SideBar from "./components/sideBar";
import Settings from "./components/settings/settings";

const cURL = "http://localhost:2999";

class Index extends Component {
  state = {
    user: {
      name: "White_Stardust",
      uid: "992",
      status: "Раздаю бонус коды на 279р"
    },
    units: [],
    mainPageVisible: false
  };
  openSettings = () => {
    this.setState({ mainPageVisible: false });
  };
  closeSettings = () => {
    this.setState({ mainPageVisible: true });
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
        <Settings
          mainPageVisible={this.state.mainPageVisible}
          closeSettings={this.closeSettings}
        />
      </div>
    );
  }
}

export default Index;
