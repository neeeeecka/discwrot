import React, { Component } from "react";
import SideBar from "./sideBar";
import loadable from "@loadable/component";
import SocketIO from "socket.io-client";

class LoadedPage extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      JSON.stringify(nextProps.selectedChannel) !==
      JSON.stringify(this.props.selectedChannel)
    );
  }
  render() {
    const Loaded = loadable(() => import("./" + this.props.rightNavState));
    return (
      <Loaded
        {...this.props}
        selectedChannel={JSON.parse(JSON.stringify(this.props.selectedChannel))}
        selectedChannelId={this.props.selectedChannel.id}
      />
    );
  }
}

class UserApp extends Component {
  state = {
    rightNavState: "me",
    selectedChannel: { name: "me", targetId: "", id: "" },
    io: null
  };
  selectChannel = (name, targetId, id) => {
    if (this.state.selectedChannel.id !== id) {
      this.setState({
        selectedChannel: { name: name, targetId: targetId, id: id }
      });
    }
  };
  getRightNav = () => {
    let rightNavState = this.state.selectedChannel.name;
    if (rightNavState !== "me") {
      rightNavState = "chat";
    }
    // const LoadedPage = loadable(() => import("./" + rightNavState));
    return (
      <LoadedPage
        user={this.props.user}
        {...this.state}
        {...this.props}
        rightNavState={rightNavState}
        selectedChannel={JSON.parse(JSON.stringify(this.state.selectedChannel))}
        selectedChannelId={this.state.selectedChannel.id}
      />
    );
  };
  shouldComponentUpdate(nextProps, nextState) {
    console.log("upd");
    return true;
  }
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
          selectedChannel={JSON.parse(
            JSON.stringify(this.state.selectedChannel)
          )}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          {this.getRightNav()}
        </div>
      </div>
    );
  }
}
export default UserApp;
