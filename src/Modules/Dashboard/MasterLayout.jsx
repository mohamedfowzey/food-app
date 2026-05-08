import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Shared/Header/Header";
import SideBar from "../Shared/SideBar/SideBar";
import NavBar from "../Shared/NavBar/NavBar";
import { ContextFounder } from "../../contexts/UserConrtrxt";

export default function MasterLayout() {
  const {mood} = React.useContext(ContextFounder);
  return (
    <>
      <div className={`d-flex ${mood} bg-main text-main`}>
        <SideBar />
        <div className="main-content py-3 px-2 overflow-visible">
          <NavBar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
