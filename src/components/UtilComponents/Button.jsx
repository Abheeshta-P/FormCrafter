import React from 'react'

function Button({
  children,
  bgColor = 'bg-zinc-800',
  textColor = 'text-white',
  type = 'button',
  className = '',
  ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg active:opacity-90 transition-opacity ${bgColor} ${textColor} ${className}`} type={type} {...props}>{children}</button>
  )
}

export default Button