import React, { Component } from "react";
import SideBar from "./sideBar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class UserApp extends Component {
  render() {
    return (
      <div
        className={
          "bg-darkGray-700 flex h-screen overflow-hidden ease duration-150 transition-all" +
          (this.props.mainPageVisible
            ? " opacity-100 scale-anim-100"
            : " opacity-0 scale-anim-95 pointer-events-none")
        }
      >
        <SideBar
          user={this.props.user}
          openSettings={this.props.openSettings}
        />
      </div>
    );
  }
}
export default UserApp;
