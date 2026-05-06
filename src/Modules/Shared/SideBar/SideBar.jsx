import React, { useContext, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import logo from "../../../assets/3.png";
import { ContextFounder } from "../../../contexts/UserConrtrxt";
import OnlyAdmins from "../Prtected/OnlyAdmins";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";
import { Button, Modal } from "react-bootstrap";
import MainButton from "../MainButton/MainButton";
import LoadingElement from "../LoadingElement/LoadingElement";
import { useForm } from "react-hook-form";
import CustomInput from "../CustomInput/CustomInput";
import lightLogo from "../../../assets/logo.png";
import { API } from "../../../Constants/axiosClient";
import { toast } from "react-toastify";

export default function SideBar() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useContext(ContextFounder);
  const onlogout = () => {
    localStorage.removeItem("token");
    logout();
  };
  const onsubmit = async (data) => {
    setLoading(true);
    try {
      const res = await API.put("Users/ChangePassword", data);
      toast.success(res?.data?.message || 'password changed')
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false);
    }
  };
  return (
    <>
      <Sidebar
        collapsed={collapsed}
        className="rounded-top-right overflow-hidden bg-sidebar  text-sidebar border-none position-sticky top-0 vh-100 sidebar-container"
      >
        <div
          className="w-100 text-center cursor-pointer"
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          <img
            height={80}
            className={collapsed ? "hieght-small" : "hieght-big"}
            src={logo}
            alt="logo"
          />
        </div>
        <Menu>
          <MenuItem
            icon={<i className="fas fa-home"></i>}
            component={<Link to="/dashboard" />}
          >
            {" "}
            Home{" "}
          </MenuItem>
          <OnlyAdmins>
            <MenuItem
              icon={<i className="fas fa-users"></i>}
              component={<Link to="/dashboard/users" />}
            >
              {" "}
              Users{" "}
            </MenuItem>
          </OnlyAdmins>
          <MenuItem
            icon={<i className="fas fa-list"></i>}
            component={<Link to="/dashboard/categories" />}
          >
            {" "}
            Categories{" "}
          </MenuItem>
          <MenuItem
            icon={<i className="fas fa-utensils"></i>}
            component={<Link to="/dashboard/recipes" />}
          >
            {" "}
            Recipes{" "}
          </MenuItem>
          <MenuItem
            onClick={() => {
              setShowChangePassword(true);
            }}
            icon={<i className="fas fa-key"></i>}
          >
            {" "}
            change Password{" "}
          </MenuItem>
          <MenuItem
            onClick={onlogout}
            icon={<i className="fas fa-sign-out-alt"></i>}
            component={<Link to="/login" />}
          >
            {" "}
            log out{" "}
          </MenuItem>
        </Menu>
      </Sidebar>
      <Modal
        show={showChangePassword}
        onHide={() => setShowChangePassword(false)}
        centered
      >
        <Modal.Body>
          <div className="bg-main rounded-4 p-5 z-2">
            <div className="text-center my-4">
              <img className="w-75" src={lightLogo} alt="logo" />
            </div>
            <h1 className="fs-3 fw-bold mb-1 text-main">
              {" "}
              change your Password
            </h1>
            <p className="text-ternary mb-4 text-sm">
              Please Enter Your old password and new one twice.{" "}
            </p>
            <form onSubmit={handleSubmit(onsubmit)}>
              <CustomInput
                type={"password"}
                name={"oldPassword"}
                errors={errors}
                register={register}
              />
              <CustomInput
                type={"password"}
                name={"newPassword"}
                errors={errors}
                register={register}
              />
              <CustomInput
                type={"password"}
                name={"confirmNewPassword"}
                errors={errors}
                register={register}
                Watch={watch}
              />

              {loading ? <LoadingElement /> : <MainButton>submit</MainButton>}
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
