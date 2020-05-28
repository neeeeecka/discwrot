import React, { Component } from "react";
import loadable from "@loadable/component";
import Message from "./message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
class Chat extends Component {
  state = {
    message: "",
    messages: []
  };

  getChat = () => {
    const dom = [];
    // console.log(this.state.messages);
    const messages = this.state.messages;
    messages.forEach((message, i) => {
      const timestamp1 = Date.parse(message.timestamp);

      let withAuthor = false;
      const prevMessage = messages[i + 1];
      if (prevMessage) {
        const timestamp0 = Date.parse(prevMessage.timestamp);

        const delta = timestamp1 - timestamp0;
        if (delta / 1000 / 60 >= 15) {
          withAuthor = true;
        }
        // console.log(delta / 1000 / 60, message, prevMessage, withAuthor);

        if (message.author.id !== prevMessage.author.id) {
          withAuthor = true;
        } else {
          if (!prevMessage.content.length && message.content.length) {
            withAuthor = true;
          }
        }
      }

      dom.unshift(
        <Message
          key={"msg-" + i}
          message={message}
          withAuthor={withAuthor}
          timestamp={timestamp1}
        />
      );
    });
    return dom;
  };

  writeMessage = e => {
    this.setState({ message: e.target.value });
  };

  sendMessage = () => {
    this.props.io.emit(
      "message",
      {
        targetChannel: this.props.selectedChannel,
        content: this.state.message
      },
      data => {
        const newMessages = [...this.state.messages];
        newMessages.unshift(data);
        this.setState({ messages: newMessages });
        console.log(data);
      }
    );
    this.setState({ message: "" });
  };
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentDidMount = async () => {
    let response = await fetch(
      `${this.props.cURL}/channels/${this.props.selectedChannel.id}/messages`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include"
      }
    );
    let data = await response.json();

    this.setState({ messages: data });
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
        <div
          className="flex-1 flex flex-col"
          style={{ maxHeight: "calc(100% - 48px)" }}
        >
          <div
            className="flex-1 overflow-y-auto pb-4"
            ref={el => {
              if (el) {
                el.scrollTo(0, el.scrollHeight);
              }
            }}
          >
            {this.getChat()}
          </div>
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
              onChange={this.writeMessage}
              onKeyDown={e => {
                //enter key press
                if (e.keyCode === 13) {
                  this.sendMessage();
                }
              }}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Chat;
