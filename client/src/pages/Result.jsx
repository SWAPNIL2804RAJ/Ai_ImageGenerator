// import React, { useContext } from 'react'
// import { assets } from '../assets/assets'
// import {motion} from 'motion/react'
// import { AppContext } from '../context/AppContext'

// const Result = () => {

//   const[image, setImage] = React.useState(assets.sample_img_2)
//   const[loading, setLoading] = React.useState(false)
//   const[isImageLoading, setIsImageLoading] = React.useState(false)
//   const[input, setInput] = React.useState('')

//   const {generateImage} = useContext(AppContext)
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     setIsImageLoading(true)

//     if(input){
//       const image = await generateImage(input)
//       if(image){
//         setLoading(true)
//         setImage(image)
//       }
//     }
//     setLoading(false)
//   }

//   return (
//     <motion.form
//       initial={{ opacity: 0.2, y: 100 }}
//       transition={{ duration: 1 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       onSubmit={onSubmitHandler}className='flex flex-col min-h-[90vh] justify-center items-center'>  
//       <div>
//         <div className='realtive'>
//           <img src={image} alt="result" className='max-w-sm rounded' />
//           <span className={`absolute bottom-0 left-0 h-1 bg-red-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`}></span>
//         </div>
//         <p className={!loading ? 'hidden' : ''}>Generating...</p>
//       </div>
//       {!isImageLoading && 
//       <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full' >
//         <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter your prompt...' className='bg-transparent flex-1 ml-8 max-sm:w-20 outline-none placeholder:color' />
//         <button type='submit' className='bg-pink-700 px-10 sm:px-16 py-3 rounded-full hover:scale-105 transition-all duration-500'>Generate</button>
//       </div>
//         }

//         {isImageLoading &&
//         <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
//           <p onClick={() => {setIsImageLoading(false)}} className='text-red-700 bg-transparent border border-zinc-900 cursor-pointer px-9 py-3 rounded-full'>Generate Another</p>
//           <a href={image} download className='bg-yellow-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
           
//         </div>
//         }
//     </motion.form>
//   )
// }

// export default Result

import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion'; // Small fix: it should be 'framer-motion' not 'motion/react'
import { AppContext } from '../context/AppContext';

const Result = () => {
  const [image, setImage] = React.useState(assets.sample_img_2);
  const [loading, setLoading] = React.useState(false);
  const [isImageLoading, setIsImageLoading] = React.useState(false);
  const [input, setInput] = React.useState('');

  const { generateImage, user } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      alert("Please enter a prompt!");
      return;
    }

    if (!user) {
      alert("Missing Details of User. Please login first!");
      return;
    }

    setIsImageLoading(true);
    setLoading(true);

    const generatedImage = await generateImage(input);

    if (generatedImage) {
      setImage(generatedImage);
    } else {
      alert("Failed to generate image. Try again!");
    }

    setLoading(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >
      <div>
        <div className="relative">
          <img src={image} alt="result" className="max-w-sm rounded" />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-red-500 ${
              loading ? 'w-full transition-all duration-[10s]' : 'w-0'
            }`}
          ></span>
        </div>
        <p className={!loading ? 'hidden' : ''}>Generating...</p>
      </div>

      {!isImageLoading && (
        <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Enter your prompt..."
            className="bg-transparent flex-1 ml-8 max-sm:w-20 outline-none placeholder:color"
          />
          <button
            type="submit"
            className="bg-pink-700 px-10 sm:px-16 py-3 rounded-full hover:scale-105 transition-all duration-500"
          >
            Generate
          </button>
        </div>
      )}

      {isImageLoading && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={() => {
              setIsImageLoading(false);
            }}
            className="text-red-700 bg-transparent border border-zinc-900 cursor-pointer px-9 py-3 rounded-full"
          >
            Generate Another
          </p>
          <a href={image} download className="bg-yellow-900 px-10 py-3 rounded-full cursor-pointer">
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
