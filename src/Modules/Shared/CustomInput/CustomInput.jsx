import React, {  useState } from "react";
const IconsForInputs = {
  email: <i className="fa-regular fa-envelope fs-4"></i>,
  newPassword: <i className="fa-solid fa-key fs-4"></i>,
  password: <i className="fa-solid fa-key fs-4"></i>,
  oldPassword: <i className="fa-solid fa-key fs-4"></i>,
  confirmNewPassword: <i className="fa-solid fa-key fs-4"></i>,
  confirmPassword: <i className="fa-solid fa-key fs-4"></i>,
  otp: <i className="fa-solid fa-lock fs-4"></i>,
  phoneNumber: <i className="fa-solid fa-phone fs-4"></i>,
  code:<i className="fa-solid fa-lock fs-4"></i>,
  userName: <i className="fa-solid fa-user fs-4"></i>,
  country: <i className="fa-solid fa-globe fs-4"></i>,
};

const validations = {
  email: { required: "email is required" },
  password: {
    required: "password is required",
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/,
      message:
        "password must contains lowercase, uppercase, digit and special character!",
    }
  },
  newPassword: {
    required: "password is required",
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/,
      message:
        "password must contains lowercase, uppercase, digit and special character!",
    }
  },
  oldPassword: {
    required: "password is required",
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/,
      message:
        "password must contains lowercase, uppercase, digit and special character!",
    }
  },
  
  confirmNewPassword: {
    
      required: "Confirm Password is required",

    },
  confirmPassword: {
    
      required: "Confirm Password is required",

    },
    otp: { required: "otp is required" ,pattern:{value:/(\w|\d){4}/,message:'invalid otp'},maxLength:{value:4,message:'otp must be 4 characters'}},
    code: { required: "code is required" ,pattern:{value:/(\w|\d){4}/,message:'invalid code'},maxLength:{value:4,message:'code must be 4 characters'}},
    phoneNumber: { required: "phone is required" ,pattern:{value:/(\d){11}/,message:'invalid phone'},maxLength:{value:11,message:'phone must be 11 characters'}},
    userName: { required: "username is required", pattern:{value:/(\w+\d){1,8}$/,message:'invalid username'},maxLength:{value:8,message:'username must be less than 8 characters'}},
    country: { required: "country is required" ,pattern:{value:/^[a-zA-Z\s]{2,}$/,message:'invalid country name'},maxLength:{value:50,message:'country name must be less than 50 characters'}}
};
export default function CustomInput({ type, register, errors, name,Watch = undefined }) {
  const [passVisible, setPassVisible] = useState(true);   
  return (
    <div className="p-1 mb-3 bg-ternary rounded-3">
      <div className="position-relative">
        <div className="position-absolute pe-1 icon-container">
          {IconsForInputs[name]}
        </div>
        {type === "password" && (
          <div
            onClick={() => setPassVisible(!passVisible)}
            className="position-absolute z-3 end-icone-container "
          >
            <i
              className={
                passVisible ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"
              }
            ></i>{" "}
          </div>
        )}
        <input
          type={type == "password" ? (passVisible ? "password" : "text") : type}
          className="form-control bg-ternary ps-5"
          {...register(name === "otp" ? "seed" : name,name=='confirmPassword'?{ ...validations[name],validate: (value) => value === Watch("password") || "Passwords do not match"}:validations[name])}
          placeholder={name}
        />
        {errors[name === "otp" ? "seed" : name] && (
          <span className="text-danger error-span position-absolute top-100 start-0  ">
            {errors[name === "otp" ? "seed" : name].message}
          </span>
        )}
      </div>
    </div>
  );
}
