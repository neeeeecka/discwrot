import React, { Component } from "react";

class Header extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render() {
    return (
      <div className="p-3 bg-darkGray-900 shadow-inner">
        <span className="text-darkGray-400 font-medium">discwrot</span>
      </div>
    );
  }
}

export default Header;
