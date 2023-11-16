import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import { AllUrl } from '../pages/AllUrl'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/all-urls' element={<AllUrl />} />
    </Routes>
  )
}

export default AllRoutes