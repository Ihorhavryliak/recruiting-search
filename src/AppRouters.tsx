

import React from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import App from './App'

export const AppRouters = React.memo (() => {

  return (
     <Routes>
      <Route path="/" element={<Navigate to="/search/users" replace />} />
        <Route path="/search/users" element={<App />} />
        <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  )
})
