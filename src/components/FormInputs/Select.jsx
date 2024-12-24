import React, { useId } from 'react'

function Select({
  options,
  label,
  name = label,
  className = '',
  defaultSelect = '',
  ...props
},ref) {
  const id = useId();
  return (
    <div className='w-full'>
      {label && <label htmlFor={id} className='text-sm md:text-base inline-block mb-2 pl-1 text-zinc-800 font-semibold'>{label}</label>}

      <select  {...props}
        id={id}
        ref={ref}
        name={name}
        className={`px-3 py-2 rounded-lg bg-white text-zinc-800 outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full text-sm md:text-base  ${className} `}>
          {/* FIXME: Warning regarding not to put selected in options */}
          <option value='' selected disabled>Select {defaultSelect}</option>
      {
        options?.map(option =>(
          <option className='hover:bg-zinc-50 text-zimc-800 font-semibold text-sm md:text-base' key={option.value} value={option.value}>{option.label}</option>
        ))
      }
      </select> 
    </div>
  )
}

export default React.forwardRef(Select);