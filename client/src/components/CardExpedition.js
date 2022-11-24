import React from 'react'

function CardExpedition({ expedition }) {

  return (
    <div className="bg-slate-50">
        <p className='font-mono'>{expedition.island}</p>
        <p className='font-mono'>{expedition.country}</p>
    </div>
  )
}

export default CardExpedition;