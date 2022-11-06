

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from './App'

export const AppRouters = React.memo (() => {

  return (
 
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  )
})
