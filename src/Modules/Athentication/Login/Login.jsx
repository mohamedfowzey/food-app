import axios from "axios";
import { useForm } from "react-hook-form";
import { LOGIN } from "../../../Constants/END_POINTS";
import { Link, useNavigate } from "react-router-dom";
import MainButton from "../../Shared/MainButton/MainButton";
import CustomInput from "../../Shared/CustomInput/CustomInput";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import LoadingElement from "../../Shared/LoadingElement/LoadingElement";
import { ContextFounder } from "../../../contexts/UserConrtrxt";

export default function Login() {
  const {saveUser} = useContext(ContextFounder);
  const navigate = useNavigate();
  const [loading, setLaoding] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setLaoding(true);

      const res = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data,
      );
      localStorage.setItem("token", res.data.token);
      saveUser();

      navigate("/dashboard");
      setLaoding(false);
    } catch (error) {
      setLaoding(false);
      toast.error( error.response?.data?.message || 'something went wrong',);

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
          name={"email"}
          errors={errors}
          type={"email"}
          register={register}
        />
        <CustomInput
          name={"password"}
          errors={errors}
          type={"password"}
          register={register}
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

        {loading ? <LoadingElement /> : <MainButton>login</MainButton>}
      </form>
    </>
  );
}
