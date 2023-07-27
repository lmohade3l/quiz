import React from 'react'

function Finished({points, max_points , highscore, dispatch}) {
    const percentage = (points / max_points) *100;

  return (
    <>
      <p className='result'>
          You Scored <strong>{points}</strong> out of {max_points} ({Math.ceil(percentage)}%)
      </p>
      <p className='highscore'>
          (Highscore: {highscore} points)
      </p>
      <button className='btn btn-uni' onClick={()=> dispatch({type:'restart'})}>
        Restart
      </button>
    </>
  )
}

export default Finished