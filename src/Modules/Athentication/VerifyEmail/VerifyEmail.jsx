import axios from 'axios';
import {  useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { VERIFY_EMAIL } from '../../../Constants/END_POINTS';
import CustomInput from '../../Shared/CustomInput/CustomInput';
import MainButton from '../../Shared/MainButton/MainButton';
import LoadingElement from '../../Shared/LoadingElement/LoadingElement';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function VerifyEmail() {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const {state} = useLocation();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const onSubmit =  async (data) => { 
setLoading(true)
    try {
      await axios.put(VERIFY_EMAIL, {...data, email:state?.email});
      navigate('/login', {state:{email:state?.email,otp:data.Code}})
      toast.success('Email verified successfully')
    } catch (error) {
      toast.error(error.response.data.message || 'something went wrong');
    }
          setLoading(false)

  }
  if(!state?.email){
    return <Navigate to={'/register'}/>
  }
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
    {!state?.email && <CustomInput type={'email'} name={'email'} errors={errors} register={register}/>}
     <CustomInput type={'text'} name={'code'} errors={errors} register={register}/>
     {loading ? <LoadingElement/> : <MainButton>Submit</MainButton>}
        </form>
    </>
  )
}
