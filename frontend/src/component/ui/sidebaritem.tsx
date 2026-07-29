import React from 'react'

interface SidebarItemProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}


const SidebarItem = ({ title, icon, onClick }: SidebarItemProps) => {
  return (
    <div className='flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer' onClick={onClick}>
      <div className='h-5 w-5'>
        {icon}
      </div>
      <span className='text-sm font-medium'>{title}</span>
    </div>
  )
}
      
    
  

export default SidebarItem