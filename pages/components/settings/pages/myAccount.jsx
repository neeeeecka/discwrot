import React, { Component } from "react";

class MyAccount extends Component {
  render() {
    return (
      <div className="flex p-5 bg-darkGray-850 rounded-md border border-darkGray-900 mt-4">
        <div className="w-100px h-100px bg-darkGray-600 rounded-full"></div>
        <div className="flex flex-col flex-1 pl-5">
          <div className="flex flex-col">
            <span className="font-bold text-xs text-darkGray-500">
              USERNAME
            </span>
            <span className="text-sm text-darkGray-400">
              {this.props.user.name}
              <span className="text-darkGray-500">#{this.props.user.uid}</span>
            </span>
          </div>
          <div className="flex flex-col mt-auto mb-0">
            <span className="font-bold text-xs text-darkGray-500">EMAIL</span>
            <span className="text-sm text-darkGray-400">
              {this.props.user.email}
            </span>
          </div>
        </div>
        <button className="m-auto mt-0 transition-all duration-150 hover:bg-accent-900 bg-accent-800 px-4 py-1 text-white rounded-md outline-none focus:outline-none">
          Edit
        </button>
      </div>
    );
  }
}
export default MyAccount;
