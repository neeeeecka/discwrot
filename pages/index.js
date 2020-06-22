import React, { Component } from "react";
import Settings from "./components/settings/settings";
import UserApp from "./components/userApp";
import * as Cookies from "js-cookie";
import cookies from "next-cookies";

const cURL = "http://localhost:2999";

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
    mainPageVisible: true
  };
  static async getInitialProps(ctx) {
    let response = await fetch(`${cURL}/@me`, {
      credentials: "include",
      headers: {
        "sec-fetch-mode": "cors",
        cookie: "sessionId=" + cookies(ctx).sessionId
      },
      body: null,
      method: "GET",
      mode: "cors"
    });
    let data = await response.json();

    return {
      sessionId: cookies(ctx).sessionId || "",
      user: data,
      cURL: cURL
    };
  }

  componentDidMount = async () => {
    // let response = await fetch(`${cURL}/@me`, {
    //   method: "GET",
    //   mode: "cors",
    //   credentials: "include"
    // });
    // let data = await response.json();
    // this.setState({ user: data, sessionId: Cookies.get("sessionId") });
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
          {...this.props}
        />
      </div>
    );
  }
}

export default Index;
