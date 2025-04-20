import React from 'react'
import { assets } from '../assets/assets'
import sample_img_2 from '../assets/sample_img_2.png'
import { delay, motion } from 'motion/react'

const Description = () => {
  return (
    <motion.div 
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1}}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className='flex flex-col justify-center items-center my-24 p-6 md:mx-28'>
        <div>
            <h1 className='text-3xl sm:text-4xl mt-9'>
                Generate <span className='text-red-600'>AI I</span>mages
            </h1>
            <p className='text-gray-500 mb-10'>
                Bring Creative Vision to Life
            </p>
        </div>
        <div className='flex flex-col md:gap-14 md:flex-row items-center gap-5 '>
            <img src={assets.sample_img_2} alt='' className='w-100 xl:w-60 rounded-lg'/>
            <div>
                <h2 className='text-3xl font-medium max-w-lg mb-4 text-purple-700'>Introducing the AI Website - Your Ultimate Text to Image Generator </h2>
                <p className='text-gray-600'>Effortlessly bring your ideas to life with our free AI image generator. Transform your text into stunning visuals in seconds. Imagine, describe, and see your vision come to life instantly.</p>
                <p className='text-gray-600'>Type a text prompt, and our advanced AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even non-existent concepts come to life effortlessly. Unleash limitless creativity with our AI technology. </p>
            </div>
        </div>
    </motion.div>
  )
}

export default Description