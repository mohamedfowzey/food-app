import React, { useContext } from "react";
import { ContextFounder } from "../../../contexts/UserConrtrxt";
import avatar from "../../../assets/UserAvatar.svg";

export default function NavBar() {
  const { user, mood,toggleMood } = useContext(ContextFounder);
  return (
    <div className="navbar bg-ternary ">
      <div className="container">
        <div className="w-fit-content ms-auto d-flex">
          <div>
            <img width={30} src={avatar} alt="" />
            <span className="ps-2">{user?.userName}</span>
          </div>
          <div className="form-check form-switch ps-4">
            <input  onChange={toggleMood} type="checkbox" className="btn-check" id="btn-check" autoComplete="off" />
            <label className="btn bg-main text-main" htmlFor="btn-check">{mood}</label>
          </div>
        </div>
      </div>
    </div>
  );
}
