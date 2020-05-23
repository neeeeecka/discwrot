import React, { Component } from "react";
import SideBar from "./components/sideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const cURL = "http://localhost:2999";

class Index extends Component {
  state = {
    user: {
      name: "White_Stardust",
      uid: "992",
      status: "Раздаю бонус коды на 279р"
    },
    units: [],
    mainPageVisible: false
  };
  openSettings = () => {
    this.setState({ mainPageVisible: false });
  };
  render() {
    return (
      <div className="relative overflow-hidden">
        <div
          className={
            "bg-darkGray-700 flex h-screen overflow-hidden ease duration-150 transition-all" +
            (this.state.mainPageVisible
              ? " opacity-100 scale-anim-100"
              : " opacity-0 scale-anim-95 pointer-events-none")
          }
        >
          <SideBar user={this.state.user} openSettings={this.openSettings} />
        </div>
        <div
          className={
            "absolute top-0 left-0 w-full bg-darkGray-700 flex h-screen overflow-hidden ease duration-150 transition-all" +
            (this.state.mainPageVisible
              ? " opacity-0 scale-anim-115 pointer-events-none"
              : " opacity-100 scale-anim-100")
          }
        >
          <div className="flex w-full h-full">
            <div className="flex-settings-left flex bg-darkGray-800 justify-end pt-20">
              <div className="width-settings-sidebar">
                <span className="text-darkGray-400 text-xs font-bold">
                  USER SETTINGS
                </span>
              </div>
            </div>
            <div className="flex-settings-right flex justify-start pt-20">
              <div className="px-10 min-w-740 text-darkGray-100 font-bold">
                MY ACCOUNT
              </div>
              <div className="px-10">
                <div className="content-center flex flex-col">
                  <span className="rounded-full text-darkGray-200 hover:bg-darkGray-650 cursor-pointer border-2 border-darkGray-500 wh-square-md flex">
                    <FontAwesomeIcon icon={faPlus} className="m-auto" />
                  </span>
                  <span className="text-darkGray-500 text-xs font-bold mx-auto mt-1">
                    ESC
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
