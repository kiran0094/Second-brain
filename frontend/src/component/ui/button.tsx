import React from 'react'
interface buttonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'destructive';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  loading?: boolean;
  


}
const button = ({ children, variant, startIcon, endIcon, onClick, type, className,loading }: buttonProps) => {
  const variantClass={
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-primary',
    destructive: 'bg-red-500 text-white hover:bg-red-600 transition duration-300',
  
  }
   const defaultstyles = `px-4 py-2 rounded-md flex items-center gap-2 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'} `
  
  return (
    <button onClick={onClick} type={type} className={`
  ${defaultstyles} 
  ${className} 
  ${loading ? 'bg-gray-500  text-white' : variantClass[variant]}
`} disabled={loading}>
      <div className='flex items-center justify-between w-full'>
      {startIcon}
      {children}
      {endIcon}
      </div>

    </button> 
  )
}

export default button