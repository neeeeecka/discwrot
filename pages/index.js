import React, { Component } from "react";
import Settings from "./components/settings/settings";
import UserApp from "./components/userApp";

const cURL = "http://localhost:2999";

class Index extends Component {
  state = {
    user: {
      name: "",
      uid: "",
      email: "",
      status: ""
    },
    units: [],
    mainPageVisible: true
  };
  componentDidMount = async () => {
    const sessionId = "dsfuhasfdjad32ewdsh";
    let response = await fetch(`${cURL}/me/${sessionId}`, {
      method: "GET"
    });
    let data = await response.json();
    this.setState({ user: data });
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
          user={this.state.user}
        />
      </div>
    );
  }
}

export default Index;
