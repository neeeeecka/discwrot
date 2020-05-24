import React, { Component } from "react";
import SideBar from "./sideBar";
import loadable from "@loadable/component";

class UserApp extends Component {
  state = { rightNavState: "chat", chatState: "dm" };
  getRightNav = () => {
    const LoadedPage = loadable(() => import("./" + this.state.rightNavState));
    return <LoadedPage user={this.props.user} {...this.state} />;
  };
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
        <div className="flex-1">{this.getRightNav()}</div>
      </div>
    );
  }
}
export default UserApp;
