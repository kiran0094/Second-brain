import {useState} from 'react'
import Input from '../component/ui/input'
import Button from '../component/ui/button'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


type SignupData = {
  email: string;
  password: string;
  username: string;
}
const Signup = () => {
  const Router = useNavigate();
  const [data, setData] = useState<SignupData>({
    email: '',
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    setLoading(true);
      const response = await axios.post('http://localhost:3000/api/v1/signup', data);

      if (response.status === 200) {
      console.log('response', response.data);
      Router("/signin", { replace: true });
    }

    console.log('response', response.data);   
    
    
   
    setLoading(false);
  }
  return (
    <section className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg min-w-48 md:min-w-150 shadow-md'>
        <h2 className='text-2xl font-bold mb-2 text-center'>Sign Up</h2>
        <p className='text-gray-600 mb-4 text-center'>Create your account to get started.</p>
        <form onSubmit={handleSubmit} className='space-y-4'>
          
            <Input type='email' id='email' placeholder='Enter your email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} /> 
            <Input type='username' id='username' placeholder='Enter your username' value={data.username} onChange={(e) => setData({...data, username: e.target.value})} />    
           <Input type='password' id='password' placeholder='Enter your password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />          
          
          <Button variant='primary'  type='submit' className='w-full flex justify-center items-center' loading={loading}>
            Sign Up
          </Button>
          <p className='text-sm text-gray-600 mt-2 text-center'>Already have an account? <a href='/signin' className='text-blue-500 hover:underline'>Sign In</a></p>
        </form>
      </div>
    </section>
  )
}

export default Signup