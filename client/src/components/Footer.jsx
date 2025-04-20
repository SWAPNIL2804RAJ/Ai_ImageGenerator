import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
      <img src={assets.logo} alt='' width={50}/>
      <p className='flex-1 flex border-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright 2025 @ Imagino.Ai - All Right Reserved.</p>
      <div className='flex items-center gap-4'>
        <img src={assets.facebook_icon} alt='' width={30}/>
        <img src={assets.twitter_icon} alt='' width={30}/>
        <img src={assets.instagram_icon} alt='' width={30}/>
        <img src={assets.linkedin_icon} alt='' width={30}/>
        <img src={assets.youtube_icon} alt='' width={30}/>
      </div>
    </div>
  )
}

export default Footer