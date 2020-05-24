import React, { Component } from "react";
class UserRow extends Component {
  render() {
    return (
      <div className="flex cursor-pointer hover:bg-darkGray-700 px-3 py-2 rounded-md">
        <div className="user-head-small bg-darkGray-200"></div>
        <div className="text-darkGray-400 flex-1 flex">
          <span className="m-auto ml-4">{this.props.name}</span>
        </div>
      </div>
    );
  }
}
class DirectMessages extends Component {
  state = {
    friends: [
      { name: "Morgenshtern", state: "offline" },
      { name: "BlackJader", state: "online" }
    ]
  };
  geFriendList = () => {
    const dom = [];
    this.state.friends.forEach(friend => {
      if (friend.name.toLowerCase().includes(this.props.findText)) {
        dom.push(<UserRow {...friend} />);
      }
    });
    return dom;
  };
  render() {
    return (
      <React.Fragment>
        <span className="text-xs px-3 text-darkGray-400 mb-2 mt-1 block font-medium">
          DIRECT MESSAGES
        </span>
        {this.geFriendList()}
      </React.Fragment>
    );
  }
}

export default DirectMessages;
