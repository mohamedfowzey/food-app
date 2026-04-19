import axios from "axios";
import { useForm } from "react-hook-form";
import { LOGIN } from "../../../Constants/END_POINTS";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [passVisible, setPassVisible] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data,
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log("Error occurred while logging in:", error);
    }
  };
  return (
    <>
      <h1 className="fs-3 fw-bold mb-1 text-main">Login</h1>
      <p className="text-ternary mb-4 text-sm">
        Welcome Back! Please enter your details
      </p>
      <form className="text-main" onSubmit={handleSubmit(onSubmit)}>
        <div className="p-1 mb-3 bg-ternary">
          <div className="position-relative">
            <div className="position-absolute top-0 start-0 pe-1 icon-container">
              <i className="fa-regular fa-envelope fs-3"></i>
            </div>
            <input
              type="email"
              className="form-control bg-ternary ps-5
            "
              {...register("email", { required: "Email is required" })}
              placeholder="E-mail"
            />
          </div>
          {errors.email && (
            <p className="text-danger text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="p-1 mb-3 bg-ternary">
          <div className="position-relative">
            <div className="position-absolute top-0 start-0 pe-1 icon-container">
              <i className="fa-solid fa-key fs-3"></i>{" "}
            </div>
            <div
              onClick={() => setPassVisible(!passVisible)}
              className="position-absolute z-3  top-0 end-0 pe-1 icon-container"
            >
              <i
                className={
                  passVisible
                    ? "fa-regular fa-eye pe-2"
                    : "fa-regular fa-eye-slash pe-2"
                }
              ></i>{" "}
            </div>
            <input
              type={passVisible ? "text" : "password"}
              className="form-control bg-ternary ps-5
            "
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
            />
          </div>
          {errors.password && (
            <p className="text-danger text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/register" className="text-decoration-none text-main">
              register?
            </Link>
            <Link
              to="/forget-password"
              className="text-decoration-none text-accent"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <button className="btn w-100 mb-3 bg-accent text-white">Login</button>
      </form>
    </>
  );
}
