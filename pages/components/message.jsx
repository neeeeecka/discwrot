import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPhone,
  faFileDownload
} from "@fortawesome/free-solid-svg-icons";

const FlatContent = props => (
  <div
    className={
      "text-base text-darkGray-100 hover:bg-darkGray-750 flex" +
      (props.className ? props.className : "") +
      (props.icon ? " my-3 py-1" : "")
    }
  >
    {props.icon ? <div className="w-40px flex mx-4">{props.icon}</div> : null}
    <div>
      {props.author ? (
        <span className="hover:underline cursor-pointer">
          {props.author.username}
        </span>
      ) : null}
      {props.children}
    </div>
  </div>
);

class Message extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.message.content !== this.props.message.content;
  }
  render() {
    const message = this.props.message;
    const withAuthor = this.props.withAuthor;
    let dom;
    if (message.content) {
      if (withAuthor) {
        dom = (
          <div className="py-2 pl-4 text-base text-darkGray-100 hover:bg-darkGray-750 flex">
            <div className="w-40px h-40px rounded-full bg-darkGray-400 m-auto ml-0 mr-4"></div>
            <div>
              <span className="hover:underline cursor-pointer">
                {message.author.username}
              </span>
              <FlatContent className=" pl-0">{message.content}</FlatContent>
            </div>
          </div>
        );
      } else {
        dom = <FlatContent className=" pl-18">{message.content}</FlatContent>;
      }
    } else {
      if (message.call) {
        dom = (
          <FlatContent
            icon={
              <FontAwesomeIcon
                icon={faPhone}
                className="text-green-500 m-auto sml-4"
                style={{ transform: "rotate(90deg)" }}
              />
            }
            author={message.author}
          >
            <span className="text-darkGray-400"> started a call</span>
          </FlatContent>
        );
      }
      if (message.attachments.length) {
        dom = (
          <FlatContent
            icon={
              <FontAwesomeIcon
                icon={faFileDownload}
                className="text-accent-500 m-auto sml-4 cursor-pointer"
              />
            }
            author={message.author}
          >
            <span className="text-darkGray-400"> sent an attachment</span>
          </FlatContent>
        );
      }
    }
    return dom;
  }
}
export default Message;
