import React from "react";
import notfound404 from "../../../assets/notfound-bg.svg";
import logo from '../../../assets/logo.png'
import MainButton from "../MainButton/MainButton";

export default function NotFound() {
  return (
    <div className="notfound">
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div className="container-fluid">
        <div className="row">
        <div className="col-md-5 p-5">
          <h1>oops.</h1>
          <h2 className="text-accent">Page not found </h2>
          <p className="mb-3">This Page doesn’t exist or was removed!
We suggest you  back to home.</p>
<MainButton><i className="fa fa-arrow-left"></i> back to home </MainButton>
        </div>
        <div className="col-md-7">
            <img src={notfound404} className="img-fluid" alt="not foun 404" />
        </div>
      </div>
      </div>
    </div>
  );
}
