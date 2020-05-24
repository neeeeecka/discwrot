import React, { Component } from "react";

class Chat extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <div className="height-header flex w-full p-3 py-2 border-b-2 border-darkGray-900">
          <span>
            <span className="text-xl leading-none text-darkGray-400">@</span>
            <span className="font-bold text-darkGray-100 ml-2">
              {this.props.selectedChannel.name}
            </span>
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default Chat;
