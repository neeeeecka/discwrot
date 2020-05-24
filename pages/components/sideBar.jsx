import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faHeadphones,
  faMicrophone
} from "@fortawesome/free-solid-svg-icons";

class UserDockButton extends Component {
  render() {
    return (
      <button
        onMouseEnter={e => {}}
        onMouseLeave={e => {}}
        onClick={this.props.onClick}
        className="wh-square-sm hover:bg-darkGray-700 rounded-md outline-none focus:outline-none"
      >
        {this.props.children}
      </button>
    );
  }
}

class UserDock extends Component {
  render() {
    let username = this.props.user.name;
    username =
      username.length > 9 ? username.substring(0, 10) + "..." : username;
    let status = this.props.user.status;
    status = status.length > 11 ? status.substring(0, 12) + "..." : status;

    const smallBtnClass = "";

    return (
      <div className="flex cursor-pointer rounded-md">
        <div className="user-head-small bg-darkGray-200 flex-shrink-0"></div>
        <div className="text-darkGray-100 ml-2 mr-1 flex-1 flex flex-col justify-center">
          <span className="font-bold leading-none text-cs">{username}</span>
          <div className="text-darkGray-300 text-xscs leading-none mt-1">
            {status}
          </div>
        </div>
        <div className="flex">
          <UserDockButton>
            <FontAwesomeIcon
              icon={faMicrophone}
              className="my-auto text-darkGray-300 "
            />
          </UserDockButton>
          <UserDockButton>
            <FontAwesomeIcon
              icon={faHeadphones}
              className="my-auto text-darkGray-300 "
            />
          </UserDockButton>
          <UserDockButton onClick={this.props.openSettings}>
            <FontAwesomeIcon
              icon={faCog}
              className="my-auto text-darkGray-300 "
            />
          </UserDockButton>
        </div>
      </div>
    );
  }
}

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

class SideBar extends Component {
  state = {
    findText: ""
  };
  render() {
    return (
      <div className="bg-darkGray-800 select-none flex">
        <div className="bg-darkGray-900 flex flex-col p-2 width-subSidebar flex">
          <span className="flex mt-1 text-darkGray-200 bg-darkGray-700 hover:bg-accent-900 hover:rounded-lgg user-head-big mx-auto cursor-pointer ease duration-150 transition-all"></span>
          <span className="w-4/7 h-1/2 bg-darkGray-850 mx-auto mt-2"></span>
        </div>
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
          <div className="bg-darkGray-850 p-2 m-auto mb-0 w-full">
            <UserDock
              user={this.props.user}
              openSettings={this.props.openSettings}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
