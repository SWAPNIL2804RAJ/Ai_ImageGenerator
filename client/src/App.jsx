import React from 'react'
import {Routes, Route} from 'react-router-dom'

// import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Result from './pages/Result'
import Footer from './components/Footer'
import BuyCredit from './pages/BuyCredit'
import About from './pages/About'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppContext } from './context/AppContext'
import { useContext } from 'react'
import Navbar from './components/Navbar'


const App = () => {

  const {showLogin} = useContext(AppContext)
  return (
    <div>
      <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-pink-50'>
        {/* <Navbar/> */}
        <ToastContainer/>
        <Navbar/>
        {showLogin && <Login/>}

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