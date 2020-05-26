import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";

function DiscButton(props) {
  let cAdd = props.className ? props.className : "";
  return (
    <a
      href={props.href}
      onClick={ev => {
        ev.preventDefault();
        props.onClick(props);
        return false;
      }}
      className={
        cAdd +
        " flex cursor-pointer px-2 py-1.15 mb-1 rounded-md active:text-darkGray-100 " +
        (props.active
          ? " text-darkGray-100 bg-darkGray-650"
          : " hover:text-darkGray-150 text-darkGray-300 hover:bg-darkGray-700")
      }
    >
      {props.children}
    </a>
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
  state = {};
  componentDidMount = async () => {};
  geFriendList = () => {
    const dom = [];
    Object.keys(this.props.user.channels).forEach(friend => {
      const sep = friend.indexOf("#");
      const name = friend.substring(0, sep);
      const separator = friend.substring(sep, friend.length);
      const channelId = this.props.user.channels[friend];
      if (friend.toLowerCase().includes(this.props.findText)) {
        dom.push(
          <UserRow
            key={friend}
            href={`/@me/${channelId}`}
            {...{ name: name, separator: separator, channelId: channelId }}
            selectedChannel={this.props.selectedChannel}
            onClick={props => {
              this.props.selectChannel(
                props.name,
                props.separator,
                props.channelId
              );
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
          href={`/@me/`}
          className="mt-2"
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
