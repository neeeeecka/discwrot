import React, { Component } from "react";
class UserRow extends Component {
  render() {
    return (
      <div
        onClick={() => this.props.onClick(this.props)}
        className="flex cursor-pointer hover:bg-darkGray-700 px-3 py-2 rounded-md"
      >
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
      { name: "Morgenshtern", state: "offline", targetId: "552" },
      { name: "BlackJader", state: "online", targetId: "323" },
      { name: "Matejicek", state: "offline", targetId: "551" }
    ]
  };
  geFriendList = () => {
    const dom = [];
    this.state.friends.forEach(friend => {
      if (friend.name.toLowerCase().includes(this.props.findText)) {
        dom.push(
          <UserRow
            {...friend}
            onClick={pFriend => {
              this.props.selectChannel(pFriend.name, pFriend.targetId);
            }}
          />
        );
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
