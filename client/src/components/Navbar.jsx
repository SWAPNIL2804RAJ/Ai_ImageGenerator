import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <Link to='/' className=''>
        <img src={assets.logo} alt='logo' className='w-[32px] h-[32px] object-contain' />
        </Link>
        <div>
            <div>
                <button>
                    <img src={assets.credit_star} alt='' />
                    <p>Credits Left : 5</p>
                </button>
                <p>Hi, Imagino.Ai</p>
            </div>
            <img src={assets.profile_icon} alt='' className='w-[32px] h-[32px] object-contain' />
        </div>
    </div>
  )
}

export default Navbar