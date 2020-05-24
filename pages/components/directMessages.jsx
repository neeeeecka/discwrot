import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";

function DiscButton(props) {
  return (
    <div
      onClick={() => props.onClick(props)}
      className={
        "flex cursor-pointer px-2 py-1.15 mb-1 rounded-md active:text-darkGray-100 " +
        (props.active
          ? " text-darkGray-100 bg-darkGray-650"
          : " hover:text-darkGray-150 text-darkGray-300 hover:bg-darkGray-700")
      }
    >
      {props.children}
    </div>
  );
}

class UserRow extends Component {
  render() {
    return (
      <DiscButton
        {...this.props}
        active={this.props.selectedChannel.name === this.props.name}
      >
        <div className="user-head-small bg-darkGray-200"></div>
        <div className="flex-1 flex">
          <span className="m-auto ml-4"> {this.props.name}</span>
        </div>
      </DiscButton>
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
        <DiscButton
          onClick={props => this.props.selectChannel("me")}
          active={this.props.selectedChannel.name === "me"}
        >
          <FontAwesomeIcon icon={faUserFriends} className="my-auto mr-5 ml-2" />
          <span>Friends</span>
        </DiscButton>
        <span className="text-xs px-3 text-darkGray-400 mb-2 mt-6 block font-medium">
          DIRECT MESSAGES
        </span>
        {this.geFriendList()}
      </React.Fragment>
    );
  }
}

export default DirectMessages;
