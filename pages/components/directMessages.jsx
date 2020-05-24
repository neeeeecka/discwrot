import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
class UserRow extends Component {
  render() {
    return (
      <div
        onClick={() => this.props.onClick(this.props)}
        className={
          "flex cursor-pointer px-2 py-1.15 mb-1 rounded-md" +
          (this.props.selectedChannel.name === this.props.name
            ? " text-darkGray-100 bg-darkGray-650"
            : " text-darkGray-300 hover:bg-darkGray-700")
        }
      >
        <div className="user-head-small bg-darkGray-200"></div>
        <div className="flex-1 flex">
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
            selectedChannel={this.props.selectedChannel}
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
        <button
          className={
            "flex w-full cursor-pointer mt-2 px-1 py-2 rounded-md outline-none focus:outline-none" +
            (this.props.selectedChannel.name === "me"
              ? " text-darkGray-100 bg-darkGray-650"
              : " text-darkGray-300 hover:bg-darkGray-700")
          }
          onClick={() => {
            this.props.selectChannel("me", "");
          }}
        >
          <FontAwesomeIcon icon={faUserFriends} className="my-auto mr-5 ml-2" />
          <span>Friends</span>
        </button>
        <span className="text-xs px-3 text-darkGray-400 mb-2 mt-6 block font-medium">
          DIRECT MESSAGES
        </span>
        {this.geFriendList()}
      </React.Fragment>
    );
  }
}

export default DirectMessages;
