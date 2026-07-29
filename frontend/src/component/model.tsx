import Button from './ui/button'
import {useState} from 'react'

type Modelprops = {
    closeModal: () => void
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
        setData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    }
   const handleSubmit = () => {
    console.log("Submitted:", data);
    
    props.closeModal();
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

           
            <label htmlFor='title' className='block mt-2 font-semibold'>Title</label>
            <input type='text' id='title' className='w-full border border-gray-300 rounded px-3 py-2' value={data.title} onChange={(e)=>handlechange(e)} />
          
          
            <label htmlFor='link' className='block mt-2 font-semibold'>Link</label>
            <input type='text' id='link' className='w-full border border-gray-300 rounded px-3 py-2' value={data.link} onChange={(e)=>handlechange(e)} />

            <label htmlFor='type' className='block mt-2 font-semibold'>Type</label>
            <select id='type' className='w-full border border-gray-300 rounded px-3 py-2' value={data.type} onChange={(e)=>handlechange(e)}>
              <option value='youtube'>YouTube</option>
              <option value='tweet'>Tweet</option>
              <option value='article'>Article</option>
            </select>

             <label htmlFor='tags' className='block mt-2 font-semibold'>Tags</label>
            <input type='text' id='tags' className='w-full border border-gray-300 rounded px-3 py-2' value={data.tags.join(', ')} onChange={(e)=>handlechange(e)} placeholder='Enter tags separated by commas' />
            </form>
              
            <div className='flex justify-between mt-4'>
           <Button variant="primary" onClick={handleSubmit}>
            submit
          </Button>
          <Button variant="destructive" onClick={props.closeModal}>
            Close
          </Button>
            </div>
        </div>
      </div>

  )
}

export default Model