import  { useContext } from "react";
import { ContextFounder } from "../../../contexts/UserConrtrxt";
import avatar from "../../../assets/userAvatar.svg";

export default function NavBar() {
  const { user, mood,toggleMood } = useContext(ContextFounder);
  return (
    <div className="navbar bg-ternary position-sticky top-0 z-3">
      <div className="container">
        <div className="w-fit-content ms-auto d-flex flex-wrap-reverse">
          <div>
            <img width={30} src={avatar} alt="" />
            <span className="ps-2">{user?.userName}</span>
          </div>
          <div className="form-check form-switch ps-4">
            <input  onChange={toggleMood} type="checkbox" className="btn-check p-0 border-0" id="btn-check" autoComplete="off" />
            <label className="btn bg-main text-main" htmlFor="btn-check">{
            mood == 'light' ? <i className=" fa fa-moon"/> : <i className=" fa fa-sun"/>
            }</label>
          </div>
        </div>
      </div>
    </div>
  );
}
