import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import loadable from "@loadable/component";

class Chat extends Component {
  state = {
    message: ""
  };
  getChat = () => {
    return;
  };
  render() {
    return (
      <React.Fragment>
        <div className="height-header flex w-full px-5 py-2 border-b shadow-bottom border-darkGray-900">
          <span>
            <span className="text-xl leading-none text-darkGray-400">@</span>
            <span className="font-bold text-darkGray-100 ml-2">
              {this.props.selectedChannel.name}
            </span>
          </span>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-1">{this.getChat()}</div>
          <div className="mb-6 mx-4 m-auto mb-0 rounded-md overflow-hidden flex">
            <span className="my-auto bg-darkGray-600 h-full flex">
              <button className="hover:bg-darkGray-150 bg-darkGray-300 my-auto ml-4 outline-none focus:outline-none rounded-full flex w-20px h-20px">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-darkGray-600 m-auto sml-4 cursor-pointer"
                />
              </button>
            </span>
            <input
              type="text"
              className="flex-1 py-3 px-4 placeholder-darkGray-550 text-darkGray-200 bg-darkGray-600 outline-none"
              placeholder={"Message @" + this.props.selectedChannel.name}
              value={this.state.message}
              onChange={e => {
                this.setState({ message: e.target.value });
              }}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Chat;
