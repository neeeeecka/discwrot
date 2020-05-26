import React, { Component } from "react";
import Settings from "./components/settings/settings";
import UserApp from "./components/userApp";

class Index extends Component {
  state = {
    user: {
      name: "",
      channels: [],
      uid: "",
      email: "",
      status: ""
    },
    units: [],
    mainPageVisible: true,
    cURL: "http://localhost:2999"
  };
  componentDidMount = async () => {
    let response = await fetch(`${this.state.cURL}/@me`, {
      method: "GET",
      mode: "cors",
      credentials: "include"
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
        <UserApp openSettings={this.openSettings} {...this.state} />
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
