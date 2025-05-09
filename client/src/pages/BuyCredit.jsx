import React from 'react'
import {delay, motion} from 'motion/react'
import { assets, plans } from '../assets/assets'

const BuyCredit = () => {
  return (
    <motion.div
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} 
    className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6 hover:scale-105 transition-all duration-500'>Our Subscription </button>
      <h1 className='text-center text-3xl font-bold mb-6 sm:mb-10'>Choose the Subscription</h1>
      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div key={index} className='bg-blue-100 drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500'>
            <img src={assets.logo_icon} alt='' width={40}/>
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'><span className='text-3xl'>₹{item.id}</span> / {item.credits}</p>
            <button className='w-full bg-blue-600 text-white mt-8 text-sm rounded-full py-1.5 min-w-52'> Purchase</button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default BuyCredit