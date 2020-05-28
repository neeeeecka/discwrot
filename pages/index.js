import React, { Component } from "react";
import Settings from "./components/settings/settings";
import UserApp from "./components/userApp";
import * as Cookies from "js-cookie";

class Index extends Component {
  static getInitialProps({ req }) {
    if (req) {
      console.log("on server, need to copy cookies from req");
    } else {
      console.log("on client, cookies are automatic");
    }
    return {};
  }
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
    this.setState({ user: data, sessionId: Cookies.get("sessionId") });
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
