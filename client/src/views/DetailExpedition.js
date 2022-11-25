import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function DetailExpedition() {

   const test = useLocation()
//    const test = useNavigate()
   console.log('test :>> ', test);
  return (
    <div className="background">
        <div className="card">
          <p className="font-mono font-bold">hello</p>
          <p className="font-mono"></p>

          <button className="btn">More</button>
        </div>
  </div>
  )
}

export default DetailExpedition