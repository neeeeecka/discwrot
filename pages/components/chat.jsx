import React, { Component } from "react";
import loadable from "@loadable/component";
import Message from "./message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { MessageObject, makeId } from "../messageObject";
// const MessageObject = require("./messageObject.js");
import config from "../../config.json";
import clientUploader from "./websocketUploader";

class Chat extends Component {
   state = {
      message: "",
      messages: [],
      loading: false,
      typers: {},
      uploadProgress: 0,
   };

   getChat = () => {
      const dom = [];
      const messages = this.state.messages;
      messages.forEach((message, i) => {
         const timestamp1 = message.timestamp;

         let withAuthor = false;
         const prevMessage = messages[i + 1];
         let ownsPreviousMessage = false;
         if (prevMessage) {
            const timestamp0 = prevMessage.timestamp;

            const delta = timestamp1 - timestamp0;
            if (delta / 1000 / 60 >= 15) {
               withAuthor = true;
            }
            // console.log(delta / 1000 / 60, message, prevMessage, withAuthor);

            if (message.author.id == prevMessage.author.id) {
               if (!prevMessage.content.length && message.content.length) {
                  withAuthor = true;
                  ownsPreviousMessage = true;
               }
            } else {
               withAuthor = true;
            }
         } else {
            withAuthor = true;
         }
         dom.unshift(
            <Message
               key={message.id}
               message={message}
               withAuthor={withAuthor}
               timestamp={timestamp1}
               className={""}
               uploadProgress={this.state.uploadProgress}
            />
         );
      });
      return dom;
   };

   typerFps = true;

   writeMessage = (e) => {
      const cc = this.getChannelCopy();
      if (this.typerFps) {
         this.typerFps = false;
         setTimeout(() => {
            this.props.io.emit(
               "typingMessage",
               {
                  targetChannel: cc,
               },
               (res) => {}
            );
            this.typerFps = true;
         }, (1 / 2) * 1000);
      }

      if (e.target.value.length <= 600) {
         this.setState({ message: e.target.value });
      }
   };

   getChannelCopy = () => {
      return JSON.parse(JSON.stringify(this.props.selectedChannel));
   };
   getTypers = () => {
      const maxTypers = 3;
      let dom = [];
      const typers = Object.values(this.state.typers);
      if (typers.length > 1) {
         for (var i = 0; i < typers.length; i++) {
            dom.push(
               <span className="font-bold" key={typers[i].name}>
                  {typers[i].name}
                  {i != maxTypers - 1 ? ", " : ""}
               </span>
            );
         }
         if (typers.length > maxTypers) {
            dom.push(
               <span className="font-bold" key="others">
                  {" "}
                  and {typers.length - maxTypers}{" "}
                  {typers.length - maxTypers == 1 ? "other" : "others"}
               </span>
            );
         }
      } else if (typers.length == 1) {
         dom.push(
            <span className="font-bold" key={typers[0].name}>
               {typers[0].name}
            </span>
         );
      }
      if (typers.length > 0) {
         dom.push(
            <span className="ml-1" key={i + "grammar"}>
               <span>{typers.length > 1 ? "are" : "is"} typing...</span>
            </span>
         );
      }

      return dom;
   };
   deleteMessage(id) {
      const newMessages = [...this.state.messages];
      newMessages.forEach((message, i) => {
         if (message.id == id) {
            newMessages.splice(i, 1);
         }
      });
      this.setState({ messages: newMessages });
   }
   addMessage(data) {
      const newMessages = [...this.state.messages];
      data.id = makeId(12);
      data.author = {
         name: this.props.user.name,
         userId: this.props.user.userId,
      };
      const tempMsg = new MessageObject(data);
      tempMsg.temporary = true;
      newMessages.unshift(tempMsg);
      this.setState({ message: "", messages: newMessages });
      return data;
   }
   sendMessage = () => {
      let message = this.state.message.trimStart().trimEnd();

      if (message.length > 0) {
         this.props.io.emit(
            "message",
            this.addMessage({
               content: message,
            }),
            (res) => {}
         );
      }
   };
   componentDidUpdate(prevProps, prevState) {
      if (prevState.messages.length != this.state.messages.length) {
         const scrollElement = this.chatScrollRef.current;
         scrollElement.scrollTo(0, scrollElement.scrollHeight);
      }
   }
   shouldComponentUpdate(nextProps, nextState) {
      this.props.io.emit("selectChannel", this.props.selectedChannel.id);
      return true;
   }
   typerTimeout = null;

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
            credentials: "include",
         }
      );

      let data = await response.json();
      this.fetched = true;
      this.setState({ messages: data, loading: false });

      const io = this.props.io;

      io.off("recieve");
      io.off("recieveTyper");

      io.on("recieve", async (recievedMessage) => {
         const newMessages = [...this.state.messages];
         let replaced = false;
         newMessages.forEach((message, i) => {
            if (message.id === recievedMessage.id) {
               newMessages[i] = recievedMessage;
               // console.log("found and updating", message, recievedMessage);
               replaced = true;
            }
         });
         if (!replaced) {
            newMessages.unshift(recievedMessage);
         }
         this.setState({ messages: newMessages });
      });
      io.on("recieveTyper", async (recievedTyper) => {
         console.log("receive");
         const newTypers = { ...this.state.typers };
         newTypers[recievedTyper.userId] = recievedTyper;
         this.setState({ typers: newTypers }, () => {
            clearTimeout(this.typerTimeout);
            this.typerTimeout = setTimeout(() => {
               let newTypers = { ...this.state.typers };
               delete newTypers[recievedTyper.userId];
               this.setState({ typers: newTypers });
            }, 1700);
         });
      });
   };

   constructor(props) {
      super(props);
      this.uploaderRef = React.createRef();
      this.chatScrollRef = React.createRef();
   }

   render() {
      return (
         <React.Fragment>
            <div className="height-header flex w-full px-5 py-2 border-b shadow-bottom border-darkGray-900">
               <span>
                  <span className="text-xl leading-none text-darkGray-400">
                     @
                  </span>
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
                     "flex-1 overflow-y-auto overflow-x-hidden mb-5" +
                     (this.state.loading ? " flex" : "")
                  }
                  ref={this.chatScrollRef}
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
                     <button
                        onClick={(e) => {
                           // console.log(this.uploaderRef);
                           this.uploaderRef.current.click();
                        }}
                        className="hover:bg-darkGray-150 bg-darkGray-300 my-auto ml-4 outline-none focus:outline-none rounded-full flex w-20px h-20px"
                     >
                        <FontAwesomeIcon
                           icon={faPlus}
                           className="text-darkGray-600 m-auto sml-4 cursor-pointer"
                        />
                     </button>
                     <input
                        type="file"
                        id="input"
                        className="invisible hidden"
                        ref={this.uploaderRef}
                        onChange={(e) => {
                           e.stopPropagation();
                           e.preventDefault();
                           var file = e.target.files[0];

                           let loader;
                           const loaderDelayer = setTimeout(() => {
                              loader = this.addMessage({
                                 progress: true,
                              });
                           }, 400);

                           clientUploader(this.props.io, file, (progress) => {
                              this.setState({
                                 uploadProgress: progress,
                              });
                              if (progress == 1) {
                                 clearTimeout(loaderDelayer);
                                 if (loader) {
                                    this.deleteMessage(loader.id);
                                 }
                              }
                           });
                           // var fileBlob =

                           // var formData = new FormData();
                           // formData.append(0, file, file.fileName);

                           // fetch(config.ip + ":2999/upload", {
                           //    method: "POST",
                           //    body: formData,
                           // });
                        }}
                     />
                  </span>
                  <MessageInput
                     writeMessage={this.writeMessage}
                     selectedChannel={this.props.selectedChannel}
                     message={this.state.message}
                     onKeyDown={(e) => {
                        //enter key press
                        if (e.keyCode === 13) {
                           this.sendMessage();
                        }
                     }}
                     // onKeyUp={}
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

function MessageInput(props) {
   const { selectedChannel, message, writeMessage, onKeyDown, onKeyUp } = {
      ...props,
   };
   return (
      <input
         type="text"
         className="flex-1 py-3 px-4 placeholder-darkGray-550 text-darkGray-200 bg-darkGray-600 outline-none"
         placeholder={"Message @" + selectedChannel.name}
         value={message}
         onChange={writeMessage}
         onKeyDown={onKeyDown}
         onKeyUp={onKeyUp}
      />
   );
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
