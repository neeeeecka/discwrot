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
          <span className="flex text-darkGray-200 bg-darkGray-700 hover:bg-accent-900 hover:rounded-lgg user-head-big mx-auto cursor-pointer ease duration-150 transition-all">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 724.85 586.02"
              className="m-auto w-logo fill-current"
            >
              <rect
                className="cls-1"
                x="143.94"
                y="219.27"
                width="407.55"
                height="159.96"
              />
              <circle className="cls-2" cx="357.12" cy="488.76" r="95.26" />
              <circle className="cls-3" cx="357.37" cy="487.99" r="25.13" />
              <path
                d="M441.66,592.72c-10,13.74-18.15,26.37-27.88,37.62-3.7,4.28-11.34,8.12-16.69,7.55-59.25-6.32-114.58-23.56-161.87-61.51A189.67,189.67,0,0,1,220.85,563c-16.44-16.24-24.11-34.54-22.38-59,7.32-103.34,30.2-202.53,72-297.5,14.19-32.22,36.44-54.56,68.07-69.26,39.11-18.17,80.15-28.64,122.67-34.25,1.94-.25,6.55.74,12.73,1.91,41.69,8,70.74,29.43,87.47,44.64-20.41-8.63-61.81-22.7-113.11-16.15-17.11,2.19-42.65,16.15-96.13,38.65-9.85,4.15-16.4,11.76-10.5,23.52,4.78,9.54,13.56,10,26.61,3.33q192.71-98.66,385.47.07c13,6.66,21.79,6.11,26.55-3.49,5.86-11.82-1.34-18.25-10.55-23.69C688.08,123.49,649,127.41,649,127.41c-39.1.11-69.71,12.73-87.57,22.08,15.56-14.43,44.08-36.35,85-43.7,2.78-.5,9.59-3.4,18.67-2.18,42.52,5.72,83.46,16.57,122.25,35.47,28.15,13.72,48.24,34,61.55,62.63C880,268.49,900.57,338.4,912.31,410.78c5.84,36,8.15,72.56,10.71,109,.56,8.06-2.86,17.62-7.37,24.61-18,28-44.46,46.56-73.88,61-35.66,17.49-73.39,28-112.86,32.59-10,1.17-17.17-1.38-22.89-9.76-7.87-11.55-16.35-22.69-25.3-35,15.17-5.3,29.71-8.91,42.92-15.3,23.94-11.58,47.49-24.12,70.39-37.64,12.39-7.33,14.38-17.76,7.24-25.63-8.58-9.46-17-5.86-26,.53-51.18,36.28-109.41,52.63-170.95,58.13-73.51,6.56-145.18-1.39-213-32.51-15.66-7.19-30.46-16.5-44.9-26-9.32-6.11-17.6-9.56-26,0-7,8-4.23,17.05,7.55,25.81,30.09,22.38,64.09,36.7,99.63,47.76Zm166.8-191.15c-.24,39.79,31.47,70.07,65.3,62.36,25.35-5.77,44-30.4,44.8-59.3.87-29.74-16.27-56.17-41.16-63.46C642.36,330.91,608.7,360.4,608.46,401.57Zm-94.92-.05c-.2-32.91-22.06-59.65-51-62.37-27.51-2.59-53.36,19.66-58.23,51.57-3.85,25.26,3.17,47.55,23.88,63.68,16.14,12.57,34.44,14.7,52.68,5C503.81,447.26,513.16,426.74,513.54,401.52Z"
                transform="translate(-198.23 -102.9)"
              />
              <path d="M627.79,148.62" transform="translate(-198.23 -102.9)" />
              <ellipse cx="260.82" cy="254.42" rx="101.6" ry="29.04" />
              <ellipse cx="465.29" cy="254.42" rx="101.6" ry="29.04" />
            </svg>
          </span>
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
