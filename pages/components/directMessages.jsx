import React, { Component } from "react";
class UserRow extends Component {
  render() {
    return (
      <div className="flex cursor-pointer hover:bg-darkGray-700 px-3 py-2 rounded-md">
        <div className="user-head-small bg-darkGray-200"></div>
        <div className="text-darkGray-400 flex-1 flex">
          <span className="m-auto ml-4">Morgenshtern</span>
        </div>
      </div>
    );
  }
}
class DirectMessages extends Component {
  state = {
    friends: []
  };
  render() {
    return (
      <React.Fragment>
        <span className="text-xs px-3 mt-2 text-darkGray-400 font-medium">
          DIRECT MESSAGES
        </span>
        <UserRow />
      </React.Fragment>
    );
  }
}

export default DirectMessages;
