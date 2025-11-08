import React from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import {  X } from 'lucide-react'
import Link from 'next/link'


export default function ResponsiveMenu({open,setOpen}:{open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>}) {
    
  return (
    <AnimatePresence>
{
    open &&(
        <motion.div
        initial={{opacity:0,top:'-100%'}}
        animate={{opacity:1,top:'10%'}}
        exit={{opacity:0,top:'-100%'}}
        transition={{duration:1}}
        className='absolute top-20 left-0 w-full h-screen
        z-20 '>
            <div className='text-xl font-semibold uppercase rounded-xl shadow-lg
            bg-[#12882f9a] text-white py-10 my-20 mx-6'>
                <div className='bg-white  w-10 h-10 rounded-full flex
                justify-center items-center ml-auto mr-6 mb-10 cursor-pointer'
                onClick={()=>setOpen(!open)}
                >
                    <X color='black' size={30}/>
                </div>
                <div className='flex flex-col justify-center items-center gap-10'>
                    <Link href="/" className="text-white hover:text-gray-300 transition hover:text-primary">
              الرئيسية
            </Link>
            <Link href="/blogs" className="text-white hover:text-gray-300 transition hover:text-primary">
              مقالات
            </Link>

            <Link href="/consultations" className="text-white hover:text-gray-300 transition hover:text-primary">
              استشارات
            </Link>
            <Link href="/courses" className="text-white hover:text-gray-300 transition hover:text-primary">
              كورسات
            </Link>
            <Link href="/suggestions" className="text-white hover:text-gray-300 transition hover:text-primary">
              اقتراحات
            </Link>
                </div>
                 
            </div>
        </motion.div>
    )
}
    
    </AnimatePresence>
  )
}