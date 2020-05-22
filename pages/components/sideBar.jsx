import React, { Component } from "react";

class UserDock extends Component {
  render() {
    return (
      <div className="flex cursor-pointer px-1 rounded-md">
        <div className="user-head-small"></div>
        <div className="text-darkGray-100 font-medium flex-1 flex">
          <span className="m-auto ml-4">White_Stardust</span>
        </div>
        <div className=""></div>
      </div>
    );
  }
}

class UserRow extends Component {
  render() {
    return (
      <div className="flex cursor-pointer hover:bg-darkGray-700 px-3 py-2 rounded-md">
        <div className="user-head-small"></div>
        <div className="text-darkGray-400 flex-1 flex">
          <span className="m-auto ml-4">Morgenshtern</span>
        </div>
      </div>
    );
  }
}

class SideBar extends Component {
  state = {
    findText: ""
  };
  render() {
    return (
      <div className="bg-darkGray-800 select-none flex">
        <div className="bg-darkGray-900 flex flex-col p-2 width-subSidebar"></div>
        <div className="flex flex-col flex-1 width-sidebar ">
          <div className="height-header flex w-full p-3 py-2 border-b-2 border-darkGray-900">
            <input
              type="text"
              value={this.state.findText}
              placeholder="Find or start a conversation"
              className="bg-darkGray-900 text-darkGray-400 placeholder-darkGray-400 text-sm px-2 rounded-md outline-none height-input m-auto w-full"
              onChange={e => this.setState({ findText: e.target.value })}
            />
          </div>
          <div className="p-3 pt-1 px-2">
            <span className="text-xs px-3 mt-2 text-darkGray-400 font-medium">
              DIRECT MESSAGES
            </span>
            <UserRow />
          </div>
          <div className="bg-darkGray-850 p-3 m-auto mb-0 w-full">
            <UserDock />
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
