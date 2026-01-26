import  { useEffect, useState } from 'react'


interface SingleColorProps {
    rgb: number[];
    weight: number;
    hexColor: string;
    index: number;
}

const SingleColor: React.FC<SingleColorProps> = ({ rgb, weight, hexColor, index}) => {

    const [alert, setAlert] = useState(false)
    const bcg = rgb.join(',');
    const hexValue = `#${hexColor}`

    useEffect(() => {
        const timeout = setTimeout(() => setAlert(false), 2000)
        return () => clearTimeout(timeout)
    },[alert])


  return (
   <article
    className={`p-8 cursor-pointer flex flex-col gap-2 transition-transform hover:scale-[1.02] relative ${index > 10 ? 'text-white' : 'text-slate-900'}`}
    style={{backgroundColor : `rgb(${bcg})`}}
    onClick={() => {
        setAlert(true);
        navigator.clipboard.writeText(hexValue)        
    }}
   >

   <p className='text-sm font-semibold opacity-60'>{weight}%</p>
    <p className='text-lg font-bold tracking-wider'>{hexValue}%</p>

    {alert && (
        <p className='absolute bottom-4 left-0 right-0 text-center text-xs uppercase font-bold animate-pulse'>
            copied
        </p>
    )
    }

   </article>
  )
}

export default SingleColor