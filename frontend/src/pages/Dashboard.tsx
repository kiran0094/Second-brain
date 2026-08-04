import { useState,useEffect } from 'react'
import Button from '../component/ui/button'
import { Plus } from '../icons/plus'
import {Share} from '../icons/share'
import Card from '../component/ui/card'
import Model from '../component/model'
import Sidebar from '../component/sidebar'
import axios from 'axios'

type User = Record<"_id" | "username", string>;

type Content = Record<
"_id" | "title" | "link",
string
> & {
  type:'tweet' | 'youtube';
  tags: Record<"_id" | "name", string>[];
  userId: User;
};

type ApiResponse = {
  content: Content[];
};
function Dashboard() {
  
  const [count, setCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [responseData, setResponseData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/content', {
          withCredentials: true,
        })
        setResponseData(response.data)

        console.log('Fetched:', response.data)
      } catch (err) {
        console.error('Fetch error:', err)
      }
    }

    fetchData()
  }, [])

  const toggleModal = () => {
    setIsOpen(!isOpen)
  } 

  return (
    <>
    
    <div className='flex min-h-screen'>
      <Sidebar/> 

    <div className='bg-background w-4/5'>

    <div className='flex gap-4 mx-2 my-4 items-end justify-end'>
      
    {isOpen && (
      <Model closeModal={toggleModal} />
    )}
      <Button variant="primary" onClick={toggleModal} startIcon={<Plus/>}>
        Add content
      </Button>
       <Button variant="secondary" onClick={() => setCount(count + 1)} startIcon={<Share/>}>
        share barin
      </Button>
    </div>
    <div className='flex gap-3 mx-2 my-4 items-start'>
      {responseData?.content.map((item) => (
        <Card
          key={item._id}
          title={item.title}
          link={item.link}
          type={item.type}
          tags={item.tags.map((tag) => tag.name)}
        
        />
      ))}
    </div>
  </div>
</div>
</>
  )
}

export default Dashboard
