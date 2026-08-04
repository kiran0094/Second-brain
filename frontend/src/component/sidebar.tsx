import Sidebaritem from './ui/sidebaritem'
import Document from '../icons/doument';
import Twitter from '../icons/tweet';
import Youtube from '../icons/youtube';
import { LuBrain } from "react-icons/lu";
import Button from './ui/button';
import Logout from '../icons/logout';
import axios from 'axios';


const sidebar = () => {
const handleLogout = async () => {
  try {
   
    await axios.post('http://localhost:3000/api/v1/logout', {}, { withCredentials: true });

    window.location.href = "/signin";
  } catch (err) {
    console.error(err);
  }
};
  return (
    <section id="sidebar" className='w-[20%] p-0'>
      <div className='p-2 fixed top-0 left-0 h-full w-[20%] text-gray-600 bg-white border-r border-2 border-gray-300'>
        <h2 className='text-lg font-semibold mb-4  flex items-center gap-2'><LuBrain size={24} /> Second Brain</h2>
        <div className='border-b border-gray-300 mb-4 w-full'></div>
        <div className='flex flex-col justify-between h-[calc(100vh-5rem)]'>

        <ul className='space-y-2'>
          <li>
            <Sidebaritem title="Tweets" icon={<Twitter />} onClick={() => console.log("Home clicked")} />
          </li>
          <li>
            <Sidebaritem title="Youtube" icon={<Youtube />} onClick={() => console.log("My Content clicked")} />
          </li>
          <li>
            <Sidebaritem title="Settings" icon={<Document />} onClick={() => console.log("Settings clicked")} />
          </li>
        </ul>
         
         <Button variant="destructive" className='w-full space-x-4 font-semibold ' onClick={handleLogout}>
          <span className='text-md px-2'>Logout</span>
          <Logout size="md" />
          
        </Button>
        

        </div>
      </div>
    </section>
  )
}

 

export default sidebar