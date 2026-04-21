import axios from "axios";
import { useForm } from "react-hook-form";
import { LOGIN } from "../../../Constants/END_POINTS";
import { Link, useNavigate } from "react-router-dom";
import MainButton from "../../Shared/MainButton/MainButton";
import CustomInput from "../../Shared/CustomInput/CustomInput";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [loading,setLaoding] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
          setLaoding(true)

      const res = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data,
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
          setLaoding(false)

    } catch (error) {
      toast.error("Error occurred while logging in:", error.message);

          setLaoding(false)

    }

  };
  return (
    <>
      <h1 className="fs-3 fw-bold mb-1 text-main">Login</h1>
      <p className="text-ternary mb-4 text-sm">
        Welcome Back! Please enter your details
      </p>
      <form className="text-main" onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
        name='email'
          errors={errors}
          type={"email"}
          register={register("email", { required: "email is required" })}
        />
        <CustomInput
        name={'password'}
          errors={errors}
          type={"password"}
          register={register("password", {
            required: "password is required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/g,
              message:
                "password must contains lowercase, uppercase, digit and special character!",
            },
          })}
        />
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
           {/* <button disabled={loading} className="btn w-100 mb-3 bg-accent text-white">login</button> */}

       {loading? <p className="text-center text-accent">laoding...</p>:<MainButton >login</MainButton>}
      </form>
    </>
  );
}
