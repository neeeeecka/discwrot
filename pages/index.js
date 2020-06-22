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
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        pragma: "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        cookie: "sessionId=" + cookies(ctx).sessionId
      },
      referrer: "http://localhost:3000/",
      referrerPolicy: "no-referrer-when-downgrade",
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
