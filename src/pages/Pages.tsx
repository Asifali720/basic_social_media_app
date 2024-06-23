import React from 'react'
import Home from './Home'
import {Routes, Route} from 'react-router-dom'
import Auth from './Auth'


const Pages = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={<Auth/>}/>
    </Routes>
    </>
  )
}

export default Pages