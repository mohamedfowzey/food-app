import React, { useState } from 'react'
const IconsForInputs = {
    email:<i className="fa-regular fa-envelope fs-4"></i>,
    password:<i className="fa-solid fa-key fs-4"></i>,
    confirmPassword:<i className="fa-solid fa-key fs-4"></i>,
    otp:<i className="fa-solid fa-lock fs-4"></i> 
    
}
export default function CustomInput({type,register,errors,name}) {
    const [passVisible,setPassVisible] = useState(false)
  return (
    <div className="p-1 mb-3 bg-ternary">
          <div className="position-relative">
            <div className="position-absolute pe-1 icon-container">
                {IconsForInputs[name]}
            </div>
            {type === 'password' && (<div
              onClick={() => setPassVisible(!passVisible)}
              className="position-absolute z-3 end-icone-container "
            >
              <i
                className={
                  passVisible
                    ? "fa-regular fa-eye "
                    : "fa-regular fa-eye-slash "
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
