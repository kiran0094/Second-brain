import {useState} from 'react'
import Input from '../component/ui/input'
import Button from '../component/ui/button'


type SignupData = {
  email: string;
  password: string;
}
const Signup = () => {
  const [data, setData] = useState<SignupData>({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    setLoading(true);
    // Handle form submission logic here
    console.log('Form submitted:', data);
    setLoading(false);
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg min-w-48 md:min-w-150 shadow-md'>
        <h2 className='text-2xl font-bold mb-2 text-center'>Sign Up</h2>
        <p className='text-gray-600 mb-4 text-center'>Create your account to get started.</p>
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

export default Signup