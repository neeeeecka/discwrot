import React, { Component } from "react";
import loadable from "@loadable/component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class Settings extends Component {
  state = {
    selectedPage: "myAccount",
    settings: {
      userSettings: { myAccount: "My Account", privacy: "Privacy & Safety" },
      appSettings: { voiceVideo: "Voice & Video", language: "Language" }
    }
  };

  selectPage = page => {
    this.setState({ selectedPage: page });
  };
  getLoadedPage = () => {
    const LoadedPage = loadable(() =>
      import("./pages/" + this.state.selectedPage)
    );
    return <LoadedPage user={this.props.user} />;
  };
  getPageButtons = () => {
    const dom = [];

    Object.keys(this.state.settings).forEach((subSetting, i) => {
      const titled =
        subSetting.substring(0, subSetting.indexOf("S")) +
        " " +
        subSetting.substring(subSetting.indexOf("S"), subSetting.length);

      dom.push(
        <span
          key={i + "-title"}
          className="flex flex-col text-darkGray-400 text-xs font-bold mb-2 ml-2"
        >
          {titled.toUpperCase()}
        </span>
      );
      const pages = Object.keys(this.state.settings[subSetting]);
      pages.forEach((page, i) => {
        const title = this.state.settings[subSetting][page];
        const last = i === pages.length - 1;
        dom.push(
          <button
            key={page}
            className={
              "w-full text-left px-2 py-1 rounded-sm outline-none focus:outline-none" +
              (page === this.state.selectedPage
                ? " bg-darkGray-600 text-darkGray-100"
                : " text-darkGray-200 hover:bg-darkGray-700") +
              (last ? " mb-0" : " mb-1")
            }
            onClick={() => this.selectPage(page)}
          >
            <span>{title}</span>
          </button>
        );
      });
      dom.push(
        <span
          key={i}
          className="w-full h-1px bg-darkGray-700 block mt-2 mb-4"
        />
      );
    });
    return dom;
  };

  render() {
    return (
      <div
        className={
          "absolute top-0 left-0 w-full bg-darkGray-700 flex h-screen overflow-hidden ease duration-150 transition-all" +
          (this.props.mainPageVisible
            ? " opacity-0 scale-anim-115 pointer-events-none"
            : " opacity-100 scale-anim-100")
        }
      >
        <div className="flex w-full h-full">
          <div className="flex-settings-left flex bg-darkGray-800 justify-end pt-16 pl-6">
            <div className="width-settings-sidebar pr-3">
              {this.getPageButtons()}
            </div>
          </div>
          <div className="flex-settings-right flex justify-start pt-16">
            <div className="px-10 min-w-acc">
              <span className="text-darkGray-100 font-bold">MY ACCOUNT</span>
              <div>{this.getLoadedPage()}</div>
            </div>
            <div className="px-10 pl-0">
              <button
                className="content-center flex flex-col outline-none focus:outline-none"
                onClick={this.props.closeSettings}
              >
                <span className="rounded-full text-darkGray-200 hover:bg-darkGray-650 cursor-pointer border-2 border-darkGray-500 wh-square-md flex">
                  <FontAwesomeIcon icon={faPlus} className="m-auto" />
                </span>
                <span className="text-darkGray-500 text-xs font-bold mx-auto mt-1">
                  ESC
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Settings;
