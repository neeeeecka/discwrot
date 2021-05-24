import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faFileDownload } from "@fortawesome/free-solid-svg-icons";

import dayjs from "dayjs";
import next from "next";

function FlatContent(props) {
   return (
      <div
         className={
            "text-base text-darkGray-100 hover:bg-darkGray-750 flex leading-relaxed " +
            (props.className ? props.className : "") +
            (props.pad ? " my-3 py-1" : "")
         }
      >
         {props.icon ? <div className="flex mx-4">{props.icon}</div> : null}
         {props.level == 0 ? (
            props.children
         ) : (
            <div>
               {props.author ? (
                  <span className="hover:underline cursor-pointer">
                     {props.author.username}
                  </span>
               ) : null}

               <span
                  className={
                     "break-all" +
                     (props.temporary
                        ? " text-darkGray-500"
                        : " text-darkGray-150")
                  }
               >
                  {props.children}
               </span>
            </div>
         )}
      </div>
   );
}

const messageMap = (message, userSideTime, messageSideTime, props) => ({
   withAuthorAndContent: (
      <div
         className={
            "py-0.5 mt-4 pl-4 text-base text-darkGray-100 hover:bg-darkGray-750 flex" +
            props.className
         }
      >
         <div className="flex-shrink-0 w-40px h-40px rounded-full bg-darkGray-400 m-auto ml-0 mr-4"></div>
         <div>
            <span className="hover:underline cursor-pointer">
               {message.author.username}
            </span>
            <span className="text-darkGray-400 text-xs ml-2">
               {userSideTime}
            </span>
            <FlatContent temporary={message.temporary}>
               {message.content}
            </FlatContent>
         </div>
      </div>
   ),
   withoutAuthorWithContent: (
      <FlatContent
         temporary={message.temporary}
         className={
            " text-darkGray-700 hover:text-darkGray-400" + props.className
         }
         icon={
            <span className="w-40px text-right text-xs leading-none m-auto">
               {messageSideTime}
            </span>
         }
      >
         {message.content}
      </FlatContent>
   ),
   call: (
      <FlatContent
         temporary={message.temporary}
         pad={true}
         icon={
            <span className="w-40px flex">
               <FontAwesomeIcon
                  icon={faPhone}
                  className={"text-green-500 m-auto sml-4" + props.className}
                  style={{ transform: "rotate(90deg)" }}
               />
            </span>
         }
         author={message.author}
      >
         <span className="text-darkGray-400"> started a call</span>
      </FlatContent>
   ),
   file: (
      <FlatContent
         className={props.className}
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
         <a
            className="text-darkGray-400 cursor-pointer hover:underline"
            href={message.attachments[0]}
         >
            {" "}
            sent an attachment:
            {" " +
               (message.attachments.length != 0
                  ? message.attachments[0].split("=")[1]
                  : null)}
         </a>
      </FlatContent>
   ),
   fileUpload: (progress) => (
      <FlatContent
         level={0}
         className={props.className}
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
         <div className="flex flex-1">
            {/* <div className="w-40px mx-4"></div> */}
            <div className="margin-auto h-5 w-1/2 bg-gray-900	">
               <div
                  className="bg-accent-500 h-full transition-all"
                  style={{ width: progress * 100 + "%" }}
               />
               <span className="text-gray-100 text-sm">
                  {progress * 100 + "%"}
               </span>
            </div>
         </div>
      </FlatContent>
   ),
});

class Message extends Component {
   shouldComponentUpdate(nextProps, nextState) {
      return (
         // JSON.stringify(nextProps.message) != JSON.stringify(this.props.message)
         nextProps.message.id != this.props.message.id ||
         nextProps.uploadProgress != this.props.uploadProgress ||
         nextProps.message.temporary != this.props.message.temporary
      );
   }
   render() {
      const message = this.props.message;
      const withAuthor = this.props.withAuthor;
      const today = +new Date();
      const messageTimestamp = this.props.timestamp;

      // console.log(dayjs);
      let userSideTime = 0;
      let messageSideTime = 0;

      let messageDDMM = dayjs(messageTimestamp).format("DD:MM");
      let todayDDMM = dayjs(today).format("DD:MM");

      let todayHHMM = dayjs(messageTimestamp).format("h:mm");
      let messageHHMM = dayjs(today).format("h:mm");

      if (todayDDMM == messageDDMM) {
         userSideTime = " Today at: " + todayHHMM;
      } else {
         userSideTime =
            " At: " + dayjs(messageTimestamp).format("DD/MM/YYYY, h:mm");
      }

      messageSideTime = messageHHMM;

      const messageModel = messageMap(
         message,
         userSideTime,
         messageSideTime,
         this.props
      );
      // console.log(message);
      if (message.content.length && message.content.length > 0) {
         if (withAuthor) {
            return messageModel.withAuthorAndContent;
         } else {
            return messageModel.withoutAuthorWithContent;
         }
      } else {
         if (message.attachments.length) {
            return messageModel.file;
         }
         if (message.progress) {
            return messageModel.fileUpload(this.props.uploadProgress);
         }
      }
   }
}
export default Message;
