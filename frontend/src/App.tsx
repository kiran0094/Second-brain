import { useState } from 'react'
import Button from './component/ui/button'
import { Plus } from './icons/plus'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button variant="primary" size="md" onClick={() => setCount(count + 1)} className="text-9xl font-bold" startIcon={<Plus/>}>
        Increment
      </Button>
      <p>Count: {count}</p>
    </>
  )
}

export default App
