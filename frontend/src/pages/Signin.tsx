import {useState} from 'react'
import Input from '../component/ui/input'
import Button from '../component/ui/button'
import axios from 'axios'


type SigninData = {
  email: string;
  password: string;
}
const Signin = () => {
  const [data, setData] = useState<SigninData>({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    setLoading(true);
    const response = await axios.post('http://localhost:3000/api/user/login', data);
    
    
    console.log('response', response.data);
    setLoading(false);
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg min-w-48 md:min-w-150 shadow-md'>
        <h2 className='text-2xl font-bold mb-4'>Sign In</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          
            <Input type='email' id='email' placeholder='Enter your email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />    
           <Input type='password' id='password' placeholder='Enter your password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />          
          
          <Button variant='primary'  type='submit' className='w-full flex justify-center items-center' loading={loading}>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Signin