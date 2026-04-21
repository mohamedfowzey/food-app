import axios from 'axios';
import  { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { RESET_PASSWORD } from '../../../Constants/END_POINTS';
import MainButton from '../../Shared/MainButton/MainButton';
import CustomInput from '../../Shared/CustomInput/CustomInput';

export default function ResetPass() { 
  const [loading,setLoading] = useState()
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
    const {state} = useLocation();
  let email =  '';
if(state?.email){
  email = state.email
}
else{
  return <Navigate to={'/forget-password'}/>
}
    const onSubmit = async(data) => {  
      setLoading(true)
      try{
      const res = await axios.post(RESET_PASSWORD,{...data,email});
      console.log(res);
      navigate('/login')
    }

      catch(e){
        console.log(e);
        
      }
      setLoading(false)
      
    }
  return (
<>
<h1 className="fs-3 fw-bold mb-1 text-main"> Reset  Password</h1>
      <p className="text-ternary mb-4 text-sm">
Please Enter Your Otp  or Check Your Inbox      </p>
<form onSubmit={handleSubmit(onSubmit)}>
  {/* <div className="p-1 mb-3 bg-ternary">
          <div className="position-relative">
            <div className="position-absolute top-0 start-0 pe-1 icon-container">
<i className="fa-solid fa-lock"></i>            </div>
            <input
              type="text"
              className="form-control bg-ternary ps-5
            "
              {...register("seed", { required: "Code is required" })}
              placeholder="Verification Code"
            />
          </div>
          {errors.code && (
            <p className="text-danger text-sm mt-1">{errors.code.message}</p>
          )}
        </div> */}
        <CustomInput type={'text'} name={'otp'} errors={errors} register={register('seed',{required:'code is required',maxLength:{value:4,message:'otp must be 4 chars'},minLength:{value:4,message:'code must be 4 chars'}})}/>
        <CustomInput type={'password'} name={'password'} errors={errors} register={register('password',{required:'password is required',pattern:{
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/g,
              message:
                "password must contains lowercase, uppercase, digit and special character!",
            }})}/>
        <CustomInput type={'password'} name={'confirmPassword'} errors={errors} register={register('confirmPassword',{required:'Confirm Password is required',validate: value => value === watch('password') || "Passwords do not match"})}/>
     {/* <div className="p-1 mb-3 bg-ternary">
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
          )}</div> */}
     {/* <div className="p-1 mb-3 bg-ternary">
          <div className="position-relative">
            <div className="position-absolute top-0 start-0 pe-1 icon-container">
              <i className="fa-solid fa-key fs-3"></i>{" "}
            </div>
            <div
              onClick={() => setConfirmPassVisible(!confirmPassVisible)}
              className="position-absolute z-3  top-0 end-0 pe-1 icon-container"
            >
              <i
                className={
                  confirmPassVisible
                    ? "fa-regular fa-eye pe-2"
                    : "fa-regular fa-eye-slash pe-2"
                }
              ></i>{" "}
            </div>
            <input
              type={confirmPassVisible ? "text" : "password"}
              className="form-control bg-ternary ps-5
            "
              {...register("confirmPassword", { required: "Confirm Password is required",validate: value => value === watch("password") || "Passwords do not match" })}
              placeholder="Confirm Password"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-danger text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}</div> */}
        {loading?<p className='text-center text-accent'>loading...</p>:<MainButton>submit</MainButton>}
</form>
</>  )
}
