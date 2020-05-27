import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPhone,
  faFileDownload
} from "@fortawesome/free-solid-svg-icons";

const FlatNonContent = props => (
  <div className="py-0.5 my-3 pl-4 text-base text-darkGray-100 hover:bg-darkGray-750 flex">
    <div className="w-40px m-auto ml-0 mr-4 flex">{props.icon}</div>
    <div>
      <span className="hover:underline cursor-pointer">
        {props.message.author.username}
      </span>
      <span className="text-darkGray-400"> {props.children}</span>
    </div>
  </div>
);

class Message extends Component {
  render() {
    const message = this.props.message;
    const withAuthor = this.props.withAuthor;
    let dom;
    const msg = add => (
      <div
        className={
          "text-darkGray-150 py-0.5 text-base-mil hover:bg-darkGray-750 flex-1 m-auto mb-0 ml-0" +
          add
        }
      >
        {message.content}
      </div>
    );
    if (message.content) {
      if (withAuthor) {
        dom = (
          <div className="py-2 pl-4 text-base text-darkGray-100 hover:bg-darkGray-750 flex">
            <div className="w-40px h-40px rounded-full bg-darkGray-400 m-auto ml-0 mr-4"></div>
            <div>
              <span className="hover:underline cursor-pointer">
                {message.author.username}
              </span>
              {msg(" pl-0")}
            </div>
          </div>
        );
      } else {
        dom = msg(" pl-18");
      }
    } else {
      if (message.call) {
        dom = (
          <FlatNonContent
            message={message}
            icon={
              <FontAwesomeIcon
                icon={faPhone}
                className="text-green-500 m-auto sml-4"
                style={{ transform: "rotate(90deg)" }}
              />
            }
          >
            started a call
          </FlatNonContent>
        );
      }
      if (message.attachments.length) {
        dom = (
          <FlatNonContent
            message={message}
            icon={
              <FontAwesomeIcon
                icon={faFileDownload}
                className="text-accent-500 m-auto sml-4 cursor-pointer"
                //   style={{ transform: "rotate(90deg)" }}
              />
            }
          >
            sent an attachment
          </FlatNonContent>
        );
      }
    }
    return dom;
  }
}
export default Message;
