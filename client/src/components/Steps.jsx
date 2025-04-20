import React from 'react'
import { delay, motion } from 'motion/react'
import { stepsData } from '../assets/assets'

const Steps = () => {
  return (
    <motion.div
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ opacity: 1 }}
        whileInView={{ opacity: 1}}
        viewport={{ once: true }}
        className='flex flex-col justify-center items-center my-32'
        >
        <h1 className='mb-2 text-black-600 inline-flex text-3xl sm:text-0xl font-bold text-center gap-2 bg-yellow-400 px-28 py-4 rounded-full border hover:scale-105 border-neutral-500 transition-all duration-700'>
            How Ai Magic Works</h1>
        <p className='text-lg text-gray-700 mb-10'>Transform Texts Into Stunning Images</p>
        <div className='space-y-4 w-full text-sm max-w-3xl'>
            {stepsData.map((item,index) => (
                <div key={index} className='flex items-center gap-4 p-5 px-8 bg-white/20 shadow-md border cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg'>
                    <img width={40} src={item.icon} alt='' />
                    <h2 className='text-xl font-medium'>{item.title}</h2>
                    <p className='text-orange-500'>{item.description}</p>
                </div>
            ))}
        </div>
    </motion.div>
  )
}

export default Steps