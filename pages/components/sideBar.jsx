import React, { Component } from "react";

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
      <div className="bg-darkGray-800 width-sidebar flex flex-col select-none">
        <div className="height-header flex w-full p-3 py-2 border-b-2 border-darkGray-900">
          <input
            type="text"
            value={this.state.findText}
            placeholder="Find or start a conversation"
            className="bg-darkGray-900 text-darkGray-400 placeholder-darkGray-400 text-sm px-2 rounded-md outline-none h-8 m-auto w-full"
            onChange={e => this.setState({ findText: e.target.value })}
          />
        </div>
        <span className="text-xs px-6 mt-2 text-darkGray-400 font-medium">
          DIRECT MESSAGES
        </span>
        <div className="p-3 pt-1">
          <UserRow />
        </div>
      </div>
    );
  }
}

export default SideBar;
