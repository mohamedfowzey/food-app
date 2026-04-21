import React, { useState } from 'react'
const IconsForInputs = {
    email:<i className="fa-regular fa-envelope fs-3"></i>,
    password:<i className="fa-solid fa-key fs-3"></i>,
    otp:<i className="fa-solid fa-lock"></i> 
    
}
export default function CustomInput({type,register,errors,name}) {
    const [passVisible,setPassVisible] = useState(false)
  return (
    <div className="p-1 mb-3 bg-ternary">
          <div className="position-relative">
            <div className="position-absolute top-0 start-0 pe-1 icon-container">
                {IconsForInputs[name]}
            </div>
            {type === 'password' && (<div
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
            </div>)}
            <input
              type={type=='password'?passVisible?'password':'text':type}
              className="form-control bg-ternary ps-5
            "
            //   {...register("email", { required: "Email is required" })}
            {...register}
              placeholder={name}
            />
          </div>
          {errors[name] && (
            <span className="text-danger fs-6 mt-1">{errors[name].message}</span>
          )}
        </div>
  )
}
