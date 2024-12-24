import React, { useId } from 'react';

function CheckboxGroup({
  options,
  label,
  name,
  className = '',
  classNameGroup = '',
  classNameLabel = '',
  classNameInput = '',
  ...props
},ref) {
  const id = useId();

  return (
    <div className={`w-full flex flex-col ${className}`}>
      {label && (
        <label className={`text-sm md:text-base mb-2 pl-1 text-zinc-800 font-semibold ${classNameLabel}`}>
          {label}
        </label>
      )}
     <div className='flex w-fit gap-5'>
     {options.map((option) => (
        <div className={`w-full flex ${className}`}>
          <input
            type="checkbox"
            id={`${id}-${option.value}`}
            name={name}
            value={option.value}
            ref={ref}
            className={`accent-zinc-900 cursor-pointer ${classNameInput}`}
            {...props}
          />
          <label key={option.value} className={`text-sm md:text-base inline-block  pl-1 text-zinc-800 font-semibold ${classNameLabel}`}>{option.label}</label>
        </div>
      ))}
     </div>
    </div>
  );
}


export default React.forwardRef(CheckboxGroup);
