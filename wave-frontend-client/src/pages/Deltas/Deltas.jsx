import React from 'react'
import '../Deltas/deltas.css'
function Deltas({block}) {
  return (
    <div className='deltas-container'>{block.title}</div>
  )
}

export default Deltas