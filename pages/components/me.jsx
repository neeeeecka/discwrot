import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
class Me extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="height-header flex w-full px-5 py-2 border-b shadow-bottom border-darkGray-900">
          <span className="pt-0.5">
            <FontAwesomeIcon
              icon={faUserFriends}
              className="my-auto text-darkGray-300 mr-2"
            />
            <span className="font-bold text-darkGray-100">Friends</span>
          </span>
          <button className="focus:outline-none text-darkGray-100 text-sm font-bold leading-none rounded-md px-2 ml-6 bg-accent-600">
            Add Friend
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Me;
