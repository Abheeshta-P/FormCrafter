import React, { forwardRef, useId } from "react";

const Input = forwardRef(({
  label,
  type = 'text',
  name = label,
  className='',
  classNameLabel = '',
  classNameInput = '',
  ...props
},ref)=>{
  const id = useId();
  return (
    <div className={`w-full ${className}`}>
    {label && (<label htmlFor={id} className={`text-sm md:text-base inline-block mb-2 pl-1 text-zinc-900 font-semibold ${classNameLabel}`} >
      {label}
    </label>)}
    <input type={type} id={id} name={name} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-zinc-50 duration-200 border border-zinc-200 w-full text-sm md:text-base  ${classNameInput}`} ref={ref} {...props}/>
    </div>
  )
});

export default Input