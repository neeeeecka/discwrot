import React, { Component } from "react";

class SideBar extends Component {
  state = {
    findText: ""
  };
  render() {
    return (
      <div className="bg-darkGray-800 shadow-inner width-sidebar flex">
        <div className="height-header flex w-full p-3 py-2">
          <input
            type="text"
            value={this.state.findText}
            placeholder="Find or start a conversation"
            className="bg-darkGray-900 text-darkGray-400 placeholder-darkGray-400 text-sm px-2 rounded-md outline-none h-8 m-auto w-full"
            onChange={e => this.setState({ findText: e.target.value })}
          />
        </div>
      </div>
    );
  }
}

export default SideBar;
