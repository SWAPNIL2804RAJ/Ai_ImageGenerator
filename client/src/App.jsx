import React from 'react'
import {Routes, Route} from 'react-router-dom'

// import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Result from './pages/Result'
import Footer from './components/Footer'
import BuyCredit from './pages/BuyCredit'
import About from './pages/About'

const App = () => {
  return (
    <div>
      <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-pink-50'>
        {/* <Navbar/> */}
        <Routes>
            <Route path='/' element={<Homepage/>}/> 
            <Route path='/results' element={<Result/>}/>
            <Route path='/buy' element={<BuyCredit/>}/>
            <Route path='/aboutUs' element={<About/>}/>
        </Routes>
        <Footer/>
        </div>
    </div>
  )
}

export default App