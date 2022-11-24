import React from 'react'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div className='flex-col text-center my-60 mx-12'>
      <NavLink to="/expeditions" className='font-mono font-bold text-2xl no-underline hover:underline'>remote island expeditions</NavLink>
      <p className='font-mono'>logo goes here</p>
    </div>
  )
}

export default Home