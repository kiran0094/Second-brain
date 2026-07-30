interface InputProps {
    type: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    placeholder?: string;
}

const Input = ({ type, id, value, onChange, placeholder }: InputProps) => {
  return (
    <>
    <label htmlFor={id} className='block mt-2 mb-0.5 font-semibold capitalize '>{id}</label>
    <input type={type} id={id} className='w-full border border-gray-300 rounded px-2 py-2' value={value} onChange={onChange} placeholder={placeholder} />
    </>

  )
}

export default Input