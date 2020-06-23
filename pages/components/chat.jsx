import React, { Component } from "react";
import loadable from "@loadable/component";
import Message from "./message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import MessageObject from "../messageObject";
// const MessageObject = require("./messageObject.js");

class Chat extends Component {
  state = {
    message: "",
    messages: [],
    loading: false,
    typers: []
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
      } else {
        withAuthor = true;
      }

      dom.unshift(
        <Message
          key={"msg-" + i}
          message={message}
          withAuthor={withAuthor}
          timestamp={timestamp1}
          className={i === 0 ? " mb-5" : ""}
        />
      );
    });
    return dom;
  };

  writeMessage = e => {
    this.setState({ message: e.target.value });
  };

  getChannelCopy = () => {
    return JSON.parse(JSON.stringify(this.props.selectedChannel));
  };
  getTypers = () => {
    let dom = [];
    const typers = this.state.typers;
    if (typers.length > 1) {
      dom = typers.map(typer => (
        <span className="font-bold">{typer.name}</span>
      ));
    } else if (typers.length == 1) {
      dom.push(<span className="font-bold">{typers[0].name}</span>);
    }
    if (typers.length > 0) {
      dom.push(
        <span className="ml-1">
          <span>{typers.length > 1 ? "are" : "is"} typing...</span>
        </span>
      );
    }

    return dom;
  };
  sendMessage = () => {
    const newMessages = [...this.state.messages];
    const data = {
      targetChannel: this.props.selectedChannel,
      content: this.state.message,
      id: makeid(12)
    };
    console.log(this.props.user.userId);
    data.author = {
      name: this.props.user.name,
      userId: this.props.user.userId
    };
    const tempMsg = new MessageObject(data);
    tempMsg.temporary = true;
    newMessages.unshift(tempMsg);

    const msgCopy = this.state.message;
    const cc = getChanngelCopy();
    this.props.io.emit(
      "message",
      {
        targetChannel: cc,
        content: msgCopy,
        id: data.id
      },
      res => {}
    );

    this.setState({ message: "", messages: newMessages });
  };
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentDidMount = async () => {
    this.fetched = false;
    setTimeout(async () => {
      if (!this.fetched) {
        this.setState({ loading: true });
      }
    }, 100);
    let response = await fetch(
      `${this.props.cURL}/channels/${this.props.selectedChannel.id}/messages`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include"
      }
    );

    let data = await response.json();
    this.fetched = true;
    this.setState({ messages: data, loading: false });

    const io = this.props.io;

    io.off("recieve");
    io.off("recieveTyper");

    io.on("recieve", async recievedMessage => {
      const newMessages = [...this.state.messages];
      let replaced = false;
      newMessages.forEach((message, i) => {
        if (message.id === recievedMessage.id) {
          newMessages[i] = recievedMessage;
          console.log("found and updating", message, recievedMessage);
          replaced = true;
        }
      });
      if (!replaced) {
        newMessages.unshift(recievedMessage);
      }
      this.setState({ messages: newMessages });
    });
    io.on("recieveTyper", async recievedTyper => {
      const newTypers = this.state.typers;
      newTypers.push(recievedTyper);
      this.setState({ typers: newTypers });
    });
    io.on("removeTyper", async recievedTyper => {
      const newTypers = this.state.typers;
      let userIndex = -1;
      for (var i = 0; i < newTypers.length; i++) {
        if (newTypers[i].userId === recievedTyper.userId) {
          userIndex = recievedTyper.userId;
          break;
        }
      }
      newTypers.splice(userIndex, 1);
      this.setState({ typers: newTypers });
    });
  };

  typeEnd = -1;
  typeStart = false;

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
            className={
              "flex-1 overflow-y-auto pb-4-not-working-in-firefox-so-applied-on--lastchild-instead" +
              (this.state.loading ? " flex" : "")
            }
            ref={el => {
              if (el) {
                el.scrollTo(0, el.scrollHeight);
              }
            }}
          >
            <div
              className={
                "m-auto text-darkGray-100" +
                (this.state.loading ? "" : " hidden")
              }
            >
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            {this.getChat()}
          </div>
          <div className={"mx-4 m-auto rounded-md overflow-hidden flex"}>
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
                const cc = this.getChannelCopy();
                clearTimeout(this.typeEnd);
                if (!this.typeStart) {
                  this.props.io.emit(
                    "typingMessage",
                    {
                      targetChannel: cc
                    },
                    res => {}
                  );
                  this.typeStart = true;
                }
                //enter key press
                if (e.keyCode === 13) {
                  this.sendMessage();
                }
              }}
              onKeyUp={e => {
                const cc = this.getChannelCopy();
                clearTimeout(this.typeEnd);
                this.typeEnd = setTimeout(() => {
                  this.props.io.emit(
                    "removeTyper",
                    {
                      targetChannel: cc
                    },
                    res => {
                      this.typeStart = false;
                    }
                  );
                }, 960);
              }}
            />
          </div>
          <div className="pt-1 mb-0 ml-2 h-1line text-sm px-2 text-darkGray-150">
            {this.getTypers()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export default Chat;
