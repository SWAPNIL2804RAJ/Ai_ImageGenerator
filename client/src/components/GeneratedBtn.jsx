import React from 'react'
import { useNavigate } from 'react-router-dom'
import {delay, motion} from 'motion/react'
import { assets } from '../assets/assets'
// import { useState } from 'react'

const GeneratedBtn = () => {
  
  const navigate = useNavigate()
  return (
    <div
    initial={{ opacity: 0.2, y:100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className='pb-16 text-center'
    >
      <h1 className='sm:text-2xl font-medium text-gray-700'>
        See the Magic. <span className='text-red-600'>Try Now !</span>
      </h1>
      <button onClick={() => navigate('/buy')} className='text-white bg-purple-600 w-auto m-auto px-12 hover:scale-105 transition-all duration-500 rounded-full py-3 flex items-center gap-2 mt-6'>
        Subscription
        <img src={assets.star_group} alt='' className='h-6'/>
      </button>
    </div>
  )
}

export default GeneratedBtn