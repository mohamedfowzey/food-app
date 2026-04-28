import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FORGET_PASSWORD } from '../../../Constants/END_POINTS';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../Shared/CustomInput/CustomInput';
import MainButton from '../../Shared/MainButton/MainButton';
import LoadingElement from '../../Shared/LoadingElement/LoadingElement';

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
      console.log( error.message);
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
        
        <CustomInput name={'email'} type={'email'} errors={errors} register={register}/>
        
        {loading?<LoadingElement/>:<MainButton>submit</MainButton>}
      </form>
    </>  )
}
