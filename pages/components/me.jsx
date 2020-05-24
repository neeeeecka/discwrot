import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
class Me extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="height-header flex w-full px-5 py-2 border-b-2 border-darkGray-900">
          <span>
            <FontAwesomeIcon
              icon={faUserFriends}
              className="my-auto text-darkGray-300 mr-2"
            />
            <span className="font-bold text-darkGray-100">Friends</span>
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default Me;
