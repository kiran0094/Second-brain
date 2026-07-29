import { Share } from "../../icons/share"
import { Plus } from "../../icons/plus"
import { Children, type ReactElement } from "react"


interface CardProps{
  link:string
  title:string 
 type:  'tweet' | 'youtube' 
 tags?: string[]

}

const Card = ({title,link,type,tags}:CardProps) => {
  return (
    <div className='bg-white rounded-md p-4 border border-gray-200 max-w-72 mx-3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2 '>
          <Plus size="md" />

          <h2 className="font-semibold text-md px-4">{title}</h2>
        </div>
        <div className='flex items-center gap-4 text-gray-500'> 
          <a href={link} target="_blank" rel="noopener noreferrer">
            <Share size="md"/>
          </a>
          <Share size="md"/>
        </div>       
      </div>
      {type === 'youtube'&&(
        <iframe className="w-full rounded-xl  pt-2" src={link.replace("watch?v=", "embed/")} 
        title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write;
         encrypted-media; gyroscope; picture-in-picture; web-share"
         referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>)
      }

      {type === 'tweet'&&(
          <blockquote className="twitter-tweet">
  <a href={link} >
    {link}
  </a>
          </blockquote>)}

      {tags && tags.length > 0 && (
        <div className="flex gap-2 mt-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-slate-200 text-blue-800 text-xs font-medium px-3 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default Card