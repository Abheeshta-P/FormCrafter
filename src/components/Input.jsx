import React, { forwardRef, useId } from "react";

const Input = forwardRef(({
  label,
  type = 'text',
  name = label,
  className = '',
  ...props
},ref)=>{
  const id = useId();
  return (
    <div className='w-full'>
    {label && (<label htmlFor={id} className='text-sm md:text-base inline-block mb-1 pl-1' >
      {label}
    </label>)}
    <input type={type} id={id} name={name} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full text-sm md:text-base  ${className}`} ref={ref} {...props}/>
    </div>
  )
});

export default Input