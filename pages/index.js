import React, { Component } from "react";
import Settings from "./components/settings/settings";
import UserApp from "./components/userApp";
import * as Cookies from "js-cookie";
import cookies from "next-cookies";

class Index extends Component {
  static getInitialProps(ctx) {
    // console.log(cookies(ctx).sessionId);
    return {
      sessionId: cookies(ctx).sessionId || ""
    };
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
        <UserApp
          openSettings={this.openSettings}
          {...this.state}
          {...this.props}
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
