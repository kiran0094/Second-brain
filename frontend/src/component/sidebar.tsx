import Sidebaritem from './ui/sidebaritem'
import Document from '../icons/doument';
import Twitter from '../icons/tweet';
import Youtube from '../icons/youtube';
import { LuBrain } from "react-icons/lu";


const sidebar = () => {
  return (
    <section id="sidebar" className='w-[20%] p-0'>
      <div className='p-4 fixed top-0 left-0 h-full w-[20%] text-gray-600 bg-white border-r border-2 border-gray-300'>
        <h2 className='text-lg font-semibold mb-4  flex items-center gap-2'><LuBrain size={24} /> Second Brain</h2>
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
      </div>
    </section>
  )
}

 

export default sidebar