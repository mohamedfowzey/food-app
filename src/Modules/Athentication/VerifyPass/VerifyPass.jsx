import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { VERIFY_PASSWORD } from '../../../Constants/END_POINTS';

export default function VerifyPass() {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const {state} = useLocation();
  const navigate = useNavigate();
  const email = state?.email || '';
  const onSubmit =  async (data) => {  
    console.log({...data, email:email});
    try {
      await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/verify', {...data, email:email});
      navigate('/reset-password', {state:{email:email,otp:data.Code}})
    } catch (error) {
      console.log(error);
      
    }
  }
  
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
     <div className="p-1 mb-3 bg-ternary">
          <div className="position-relative">
            <div className="position-absolute top-0 start-0 pe-1 icon-container">
<i class="fa-solid fa-lock"></i>            </div>
            <input
              type="text"
              className="form-control bg-ternary ps-5
            "
              {...register("code", { required: "Code is required" })}
              placeholder="Verification Code"
            />
          </div>
          {errors.code && (
            <p className="text-danger text-sm mt-1">{errors.code.message}</p>
          )}
        </div>
        <button className="btn w-100 mb-3 bg-accent text-white" >submit</button>
        </form>
    </>
  )
}
