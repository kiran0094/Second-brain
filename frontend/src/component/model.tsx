import Button from './ui/button'
import {useState} from 'react'
import Input from './ui/input'
import axios from 'axios'

type Modelprops = {
    closeModal: () => void
    refreshData: () => void
}

type FormData = {
    title: string;
    link: string;
    type: 'youtube' | 'tweet' | 'article';
    tags: string[];
}


const Model = (props: Modelprops) => {
    const handlechange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { id, value } = e.target;

  setData((prevData) => {
    if (id === "tags") {
      return {
        ...prevData,      
        tags: value.split(",").map((tag) => tag.trimStart()),
      };
    }

    return {
      ...prevData,
      [id]: value,
    };
  });
};
   const handleSubmit = async () => {
     const response = await axios.post('http://localhost:3000/api/v1/content', data,{
        withCredentials: true,
      });
    console.log("Submitted:", response.data);
    
    props.closeModal();
    props.refreshData();
  };

    const[data,setData] = useState<FormData>({
        title: '',
        link: '',
        type: 'youtube',
        tags: [],
    })
  return (
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 border border-gray-900 rounded-lg'>
        <div className='bg-white p-8 rounded-lg w-1/2'>
           <div className='flex justify-between items-center '>
             <h2 className='text-xl font-bold mb-1'>Add Content</h2>
           
          </div>
          <p className='mb-4'>This is the content for adding new items.</p>

            <form className='flex flex-col '>

           
            
            <Input type='text' id='title' value={data.title} onChange={(e)=>handlechange(e)} />  
                     
            <Input type='text' id='link' value={data.link} onChange={(e)=>handlechange(e)} />

            <label htmlFor='type' className='block mt-2 font-semibold'>Type</label>
            <select id='type' className='w-full border border-gray-300 rounded px-3 py-2' value={data.type} onChange={(e)=>handlechange(e)}>
              <option value='youtube'>YouTube</option>
              <option value='tweet'>Tweet</option>
              <option value='article'>Article</option>
            </select>

            
            <Input type='text' id='tags' value={data.tags.join(', ')  } onChange={(e)=>handlechange(e)} placeholder='Enter tags separated by commas' />
            </form>
              
            <div className='flex justify-between mt-4'>
           <Button variant="primary" onClick={handleSubmit}>
            submit
          </Button>
          <Button variant="destructive" onClick={() => {
            props.closeModal();
            props.refreshData();
          }}>
            Close
          </Button>
            </div>
        </div>
      </div>

  )
}

export default Model