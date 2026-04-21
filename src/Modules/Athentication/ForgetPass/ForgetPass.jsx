import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FORGET_PASSWORD } from '../../../Constants/END_POINTS';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../Shared/CustomInput/CustomInput';
import MainButton from '../../Shared/MainButton/MainButton';

export default function ForgetPass() {
  const navigate = useNavigate();
  const [loading,setLoading] = useState()
  const {register, handleSubmit,formState: {errors}} = useForm()
  const onSubmit = async(data) => {
    setLoading(true)
    try {
      await axios.post(FORGET_PASSWORD, data);
      navigate('/reset-password', {state:{email:data.email}})
    }
    catch (error) {
      console.log("Error occurred while requesting password reset:", error);
    }
    setLoading(false)
  }
  return (
 <>
      <h1 className="fs-3 fw-bold mb-1 text-main">Forgot Your Password?</h1>
      <p className="text-ternary mb-4 text-sm">
No worries! Please enter your email and we will send a password reset link      
     </p>
      <form className="text-main" onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="p-1 mb-3 bg-ternary">
          <div className="position-relative">
            <div className="position-absolute top-0 start-0 pe-1 icon-container">
              <i className="fa-regular fa-envelope fs-3"></i>
            </div>
            <input
              type="email"
              className="form-control bg-ternary ps-5
            "
              {...register("email", {required: "Email is required"})}
              placeholder="E-mail"
            />
          </div>
          {errors.email && <p className="text-danger text-sm mt-1">{errors.email.message}</p>}

        </div> */}
        <CustomInput name={'email'} type={'email'} errors={errors} register={register('email',{required:'email is required',pattern:{value:/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,message:'invalid email'}})}/>
        
        {/* <button className="btn w-100 mb-3 bg-accent text-white" >submit</button> */}
        {loading?<p className='text-center text-accent'>loading...</p>:<MainButton>submit</MainButton>}
      </form>
    </>  )
}
