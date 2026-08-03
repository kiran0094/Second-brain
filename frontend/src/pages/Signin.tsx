import {useState} from 'react'
import Input from '../component/ui/input'
import Button from '../component/ui/button'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

type SigninData = {
  identifier: string;
  password: string;
}
const Signin = () => {
  const [data, setData] = useState<SigninData>({
    identifier: '',
    password: ''
  })
  const Router = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    setLoading(true);
    const response = await axios.post('http://localhost:3000/api/v1/login', data,
      {
        withCredentials: true,
      }
    );
    
    
    if (response.status === 200) {
      console.log('response', response.data);
      Router("/", { replace: true });
    }
    setLoading(false);
  }
  return (
    <section className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg min-w-48 md:min-w-150 shadow-md '>
        <h2 className='text-2xl font-bold mb-4 text-center'>Sign In</h2>
        <p className='text-gray-600 mb-4 text-center'>Log in to your account.</p>
        <form onSubmit={handleSubmit} className='space-y-4 '>
          
            <Input type='text' id='identifier' placeholder='Enter your email or username' value={data.identifier} onChange={(e) => setData({...data, identifier: e.target.value})} />    
           <Input type='password' id='password' placeholder='Enter your password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />          
          
          <Button variant='primary'  type='submit' className='w-full flex justify-center items-center' loading={loading}>
            Sign In
          </Button>
        </form>
          <p className='text-sm text-gray-600 mt-2 text-center'>Don't have an account? <a href='/signup' className='text-blue-500 hover:underline'>Sign Up</a></p>
      </div>
    </section>
  )
}

export default Signin