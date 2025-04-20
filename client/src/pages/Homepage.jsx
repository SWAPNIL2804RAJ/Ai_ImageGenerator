import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Testimonial from '../components/Testimonial'
import GeneratedBtn from '../components/GeneratedBtn'

const Homepage = () => {
  return (
    <div>
        <Header/>
        <Steps/>
        <Description/>
        <Testimonial/>
        <GeneratedBtn/>
    </div>
  )
}

export default Homepage