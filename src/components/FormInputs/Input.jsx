import React, { forwardRef, useId, useState } from "react";

const Input = forwardRef(({ label, type = 'text', name = label, className = '', classNameLabel = '', classNameInput = '', ...props }, ref) => {
  const id = useId();
  
  // State to toggle between password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (<label htmlFor={id} className={`text-sm md:text-base inline-block mb-2 pl-1 text-zinc-900 font-semibold ${classNameLabel}`}>{label}</label>)}
      <div className="relative">
        <input 
          type={type === "password" && showPassword ? "text" : type} 
          id={id} 
          name={name} 
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-zinc-50 duration-200 border border-zinc-200 w-full text-sm md:text-base ${classNameInput}`} 
          ref={ref} 
          {...props}
        />
        {type === "password" && (<button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-zinc-500">{showPassword ? "Hide" : "Show"}</button>)}
      </div>
    </div>
  );
});

export default Input;
