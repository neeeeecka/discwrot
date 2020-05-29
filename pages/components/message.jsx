import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faFileDownload } from "@fortawesome/free-solid-svg-icons";

class FlatContent extends Component {
  componentWillReceiveProps(nextProps) {}
  render() {
    const props = this.props;
    return (
      <div
        className={
          "text-base text-darkGray-100 hover:bg-darkGray-750 flex leading-relaxed " +
          (props.className ? props.className : "") +
          (props.pad ? " my-3 py-1" : "")
        }
      >
        {props.icon ? <div className="flex mx-4">{props.icon}</div> : null}
        <div>
          {props.author ? (
            <span className="hover:underline cursor-pointer">
              {props.author.username}
            </span>
          ) : null}
          <span
            className={
              "break-all" +
              (props.temporary ? " text-darkGray-500" : " text-darkGray-150")
            }
          >
            {props.children}
          </span>
        </div>
      </div>
    );
  }
}

class Message extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      JSON.stringify(nextProps.message) != JSON.stringify(this.props.message)
    );
  }
  render() {
    const message = this.props.message;
    const withAuthor = this.props.withAuthor;
    const date = new Date(this.props.timestamp * 1000);
    const HourMin = date.getHours() + ":" + date.getMinutes();
    let DMY = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();

    let dom = null;
    if (message.content) {
      if (withAuthor) {
        dom = (
          <div className="py-0.5 mt-4 pl-4 text-base text-darkGray-100 hover:bg-darkGray-750 flex">
            <div className="flex-shrink-0 w-40px h-40px rounded-full bg-darkGray-400 m-auto ml-0 mr-4"></div>
            <div>
              <span className="hover:underline cursor-pointer">
                {message.author.username}
              </span>
              <span className="text-darkGray-400 text-xs ml-2"> at {DMY}</span>
              <FlatContent temporary={message.temporary}>
                {message.content}
              </FlatContent>
            </div>
          </div>
        );
      } else {
        dom = (
          <FlatContent
            temporary={message.temporary}
            className={
              " text-darkGray-700 hover:text-darkGray-400" +
              this.props.className
            }
            icon={
              <span className="w-40px text-right text-xs leading-none m-auto">
                {HourMin}
              </span>
            }
          >
            {message.content}
          </FlatContent>
        );
      }
    } else {
      if (message.call) {
        dom = (
          <FlatContent
            temporary={message.temporary}
            pad={true}
            icon={
              <span className="w-40px flex">
                <FontAwesomeIcon
                  icon={faPhone}
                  className={
                    "text-green-500 m-auto sml-4" + this.props.className
                  }
                  style={{ transform: "rotate(90deg)" }}
                />
              </span>
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
            className={this.props.className}
            temporary={message.temporary}
            pad={true}
            icon={
              <span className="w-40px flex">
                <FontAwesomeIcon
                  icon={faFileDownload}
                  className="text-accent-500 m-auto sml-4 cursor-pointer"
                />
              </span>
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
