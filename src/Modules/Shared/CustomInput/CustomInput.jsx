import React, {  useState } from "react";
const IconsForInputs = {
  email: <i className="fa-regular fa-envelope fs-4"></i>,
  password: <i className="fa-solid fa-key fs-4"></i>,
  confirmPassword: <i className="fa-solid fa-key fs-4"></i>,
  otp: <i className="fa-solid fa-lock fs-4"></i>,
};

const validations = {
  email: { required: "email is required" },
  password: {
    required: "password is required",
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/g,
      message:
        "password must contains lowercase, uppercase, digit and special character!",
    }
  },
  confirmPassword: {
    
      required: "Confirm Password issssss required",
    },
    otp: { required: "otp is required" ,pattern:{value:/(\w|\d){4}/g,message:'invalid otp'},maxLength:{value:4,message:'otp must be 4 characters'}},
};
export default function CustomInput({ type, register, errors, name,Watch = undefined }) {
  const [passVisible, setPassVisible] = useState(false);
  return (
    <div className="p-1 mb-3 bg-ternary">
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
