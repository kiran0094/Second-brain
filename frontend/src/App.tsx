import { useState } from 'react'
import Button from './component/ui/button'
import { Plus } from './icons/plus'
import {Share} from './icons/share'
import Card from './component/ui/card'
import Model from './component/model'
import Sidebar from './component/sidebar'

function App() {
  const [count, setCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => {
    setIsOpen(!isOpen)
  } 

  return (
    <>
    
    <div className='flex min-h-screen'>
      <Sidebar/> 

    <div className='bg-background w-3/4'>

    <div className='flex gap-4 mx-2 my-4 items-start'>
      
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
      <Card title="My Card" link="https://www.youtube.com/watch?v=87T8xE-_yeo" type="youtube" tags={["React", "TypeScript"]} />
      <Card title="My Card" link="https://x.com/JobFound5/status/2069081308756894065" type="tweet" tags={["React", "TypeScript"]} />
      </div>    
    </div>
    </div>
    </>
  )
}

export default App
