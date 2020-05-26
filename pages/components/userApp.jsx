import React, { Component } from "react";
import SideBar from "./sideBar";
import loadable from "@loadable/component";
import SocketIO from "socket.io-client";

class UserApp extends Component {
  state = {
    rightNavState: "me",
    selectedChannel: { name: "me", targetId: "", id: "" },
    io: null
  };
  selectChannel = (name, targetId, id) => {
    this.setState({
      selectedChannel: { name: name, targetId: targetId, id: id }
    });
  };
  getRightNav = () => {
    let rightNavState = this.state.selectedChannel.name;
    if (rightNavState !== "me") {
      rightNavState = "chat";
    }
    const LoadedPage = loadable(() => import("./" + rightNavState));
    return (
      <LoadedPage user={this.props.user} {...this.state} {...this.props} />
    );
  };

  componentDidMount = () => {
    const io = SocketIO("ws://localhost:2998");
    this.state.io = io;
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
          cURL={this.props.cURL}
          openSettings={this.props.openSettings}
          selectChannel={this.selectChannel}
          {...this.state}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          {this.getRightNav()}
        </div>
      </div>
    );
  }
}
export default UserApp;
