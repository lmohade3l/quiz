import React from 'react'

function Finished(points, max_points) {
    const percentage = (points / max_points) *100;
  return (
    <p className='result'>
        You Scored <strong>{points}</strong> out of {max_points} 
    </p>
  )
}

export default Finished