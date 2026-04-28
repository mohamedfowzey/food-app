import axios from 'axios';
import  { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { RESET_PASSWORD } from '../../../Constants/END_POINTS';
import MainButton from '../../Shared/MainButton/MainButton';
import CustomInput from '../../Shared/CustomInput/CustomInput';
import LoadingElement from '../../Shared/LoadingElement/LoadingElement';

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
  let email;
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
  
        <CustomInput type={'text'} name={'otp'} errors={errors} register={register}/>
        <CustomInput type={'password'} name={'password'} errors={errors} register={register}/>
        <CustomInput type={'password'} name={'confirmPassword'} errors={errors} register={register} Watch={watch}/>
    
        {loading?<LoadingElement/>:<MainButton>submit</MainButton>}
</form>
</>  )
}
