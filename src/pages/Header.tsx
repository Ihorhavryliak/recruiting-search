import React from 'react'
import DarkMode from '../tools/DarkMode'
import './../App.css'
type  HeaderType = {

}
export  const Header: React.FC<HeaderType>  = () => {
  return (
    <div className='gridHeader'>
    <div className='headerTitle'>Recruiting search on GitHub</div>
    <div className='darkMode'>
        <DarkMode />
    </div>
    </div>
  )
}
