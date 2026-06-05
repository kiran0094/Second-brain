import React from 'react'

interface ButtonProps {
  variant: 'primary' | 'secondary'
  size: 'sm' | 'md' | 'lg',
  loading?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  onClick: () => void
  children?: React.ReactNode
  className?: string
}

const sizeClasses = {
  "sm": 'px-2 py-1 text-sm rounded-xl',
  "md": 'px-4 py-2 text-base rounded-xl',
  "lg": 'px-6 py-3 text-lg rounded-xl',
}

const variantClasses = {
  
  "primary": 'bg-primary text-white',
  "secondary": 'bg-secondary text-white',
}
const defaultProps = "cursor-pointer transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50"


const Button = (props: ButtonProps) => {
  return (
    <button className={`${sizeClasses[props.size]} ${variantClasses[props.variant]} ${defaultProps} ${props.className || ''}`} onClick={props.onClick}>
      <div className="flex items-center">
       {props.startIcon &&
          React.isValidElement(props.startIcon) &&
          React.cloneElement(props.startIcon as React.ReactElement<any>, {
            size: props.size,
          })}
      {props.children}
      {props.endIcon && <span className="ml-2">{props.endIcon}</span>}
      </div>
    </button>
  )
}

export default Button