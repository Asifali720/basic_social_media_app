import React from 'react'
import Home from './Home'
import {Routes, Route} from 'react-router-dom'
import Auth from './Auth'
import ResetComponent from '../components/auth_components/ResetComponent'
import PageNotFound from './PageNotFound'
import FriendProfile from './FriendProfile'


const Pages = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/auth/reset' element={<ResetComponent/>}/>
      <Route path='*' element={<PageNotFound/>}/>
      <Route path='/profile/:id' element={<FriendProfile/>}/>
    </Routes>
    </>
  )
}

export default Pages