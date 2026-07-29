import React from 'react'
interface buttonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'destructive';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick: () => void;
}
const button = ({ children, variant, startIcon, endIcon, onClick }: buttonProps) => {
  const variantClass={
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-primary',
    destructive: 'bg-red-500 text-white hover:bg-red-600 transition duration-300',
  
  }
   const defaultstyles = 'px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer '
  
  return (
    <button onClick={onClick} className={variantClass[variant] + ' ' + defaultstyles}>
      <div className='flex items-center gap-2'>
      {startIcon}
      {children}
      {endIcon}
      </div>

    </button> 
  )
}

export default button