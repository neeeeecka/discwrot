import React, { Component } from "react";
import Settings from "./components/settings/settings";
import UserApp from "./components/userApp";

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
        <UserApp
          user={this.state.user}
          openSettings={this.openSettings}
          mainPageVisible={this.state.mainPageVisible}
        />
        <Settings
          mainPageVisible={this.state.mainPageVisible}
          closeSettings={this.closeSettings}
        />
      </div>
    );
  }
}

export default Index;
