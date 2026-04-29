import React from 'react'
import CustomInput from '../../Shared/CustomInput/CustomInput';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { REGISTER } from '../../../Constants/END_POINTS';
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';
import MainButton from '../../Shared/MainButton/MainButton';
const registerInput = [
  { name: 'userName', type: 'text' },
  { name: 'email', type: 'email' },
  { name: 'password', type: 'password' },
  { name: 'confirmPassword', type: 'password' },
  { name: 'phoneNumber', type: 'text' },
  { name: 'country', type: 'text' },
];
export default function Register() {
  const navigate = useNavigate();
  const { register, formState: { errors },handleSubmit, watch } = useForm();
  const onsubmit = async (data) => {
    try{
    const res = await axios.post(REGISTER,data)
    navigate('/verify-email',{state:{email:data.email}})
    toast.success(res.data.message)
    }
    catch(e){
      toast.error(e.response.data.message);
    }
  };
  return (
    <>
    <h1 className="fs-3 fw-bold mb-1 text-main">Register</h1>
      <p className="text-ternary mb-4 text-sm">
        Please enter your details to create an account
      </p>
    <form onSubmit={handleSubmit(onsubmit)}>
    {registerInput.map((input,index)=><CustomInput key={index} {...input} errors={errors} register={register} Watch={input.name === 'confirmPassword' ? watch : undefined}  />)}
    <MainButton>Submit</MainButton>
    </form>

    </>
  )
}
