import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
// import {AppContext} from '../context/AppContext';


const Header = () => {
    const { user, setShowLogin } = useContext(AppContext)  // user is undefined, setShowLogin is undefined

    // const { user, setShowLogin } = useContext(AppContext)
    const navigate = useNavigate(); 
    
    const onClickHandler = () => {
        if(user) {  // user is undefined
            navigate('/results')
        } else {
            setShowLogin(true)  // setShowLogin is undefined
        }
    }

    return (

    <motion.div className='flex flex-col justify-center items-center text-center my-20'
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1}}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} 
    >
        <motion.div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border hover:scale-105 border-neutral-500 transition-all duration-700'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ delay: 0.2, duration: 0.8 }}
            >
            <p>Best Transform Words into Art</p>
            <img src={assets.star_icon} alt='star' />
        </motion.div>
        <motion.h1 className='text-4xl max-w-[400px] sm:text-6xl sm:max-w-[590x] mx-auto mt-10 text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
        >Transform words into, <br/><span className='text-red-600 font-bold'>Art</span> in seconds.</motion.h1>
        
        <motion.p className='text-center max-w-xl mx-auto mt-5'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
        >Unleash boundless creativity with Ai -  Turn your thoughts into stunning visual art instantly. Just type and watch the magic to happen. </motion.p>
        
        <motion.button onClick={onClickHandler} className='sm:text-lg text-white bg-purple-700 w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ default: { duration: 0.5 }, opacity:{delay: 0.8, duration: 1}}}            

        >Generate Image
            <img src ={assets.star_group} alt='star' className='h-6'/>
        </motion.button>



    <motion.div className='flex flex-wrap justify-center mt-16 gap-3'>
        {Array(5).fill('').map((item, index)=>(
            <motion.img 
                key={index} // Add this unique key prop
                whileHover={{ scale: 1.05, duration: 0.1 }}
                className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm::w10' 
                src={index % 2===0 ? assets.sample_img_2 : assets.sample_img_1} 
                alt=' ' 
                width={70}
            />
        ))}
    </motion.div>
        <motion.p
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className='mt-2 text-neutral-600'>
                <br/>Generate images for free with Imagino.Ai.<br/> Join 1000+ users who are already using our service.
        </motion.p>
    </motion.div>
  )
}

export default Header