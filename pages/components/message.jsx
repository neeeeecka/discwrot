import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPhone,
  faFileDownload
} from "@fortawesome/free-solid-svg-icons";

const FlatNonContent = props => (
  <div
    className={
      "text-base text-darkGray-100 hover:bg-darkGray-750 flex" +
      props.className +
      (props.icon ? " my-3 py-1" : "")
    }
  >
    {props.icon ? <div className="w-40px flex mx-4">{props.icon}</div> : null}
    <div>{props.children}</div>
  </div>
);
//  <span className="hover:underline cursor-pointer">
//     {props.message.author.username}
//   </span>
//   <span className="text-darkGray-400"> {props.children}</span>
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
              <FlatNonContent className=" pl-0">
                {message.content}
              </FlatNonContent>
            </div>
          </div>
        );
      } else {
        dom = (
          <FlatNonContent className=" pl-18">{message.content}</FlatNonContent>
        );
      }
    } else {
      if (message.call) {
        dom = (
          <FlatNonContent
            className=" pl-0"
            icon={
              <FontAwesomeIcon
                icon={faPhone}
                className="text-green-500 m-auto sml-4"
                style={{ transform: "rotate(90deg)" }}
              />
            }
          >
            <span className="hover:underline cursor-pointer">
              {message.author.username}
            </span>
            <span className="text-darkGray-400"> started a call</span>
          </FlatNonContent>
        );
      }
      if (message.attachments.length) {
        //   <FontAwesomeIcon
        //     icon={faFileDownload}
        //     className="text-accent-500 m-auto sml-4 cursor-pointer"
        //     //   style={{ transform: "rotate(90deg)" }}
        //   />
        dom = null;
      }
    }
    return dom;
  }
}
export default Message;
