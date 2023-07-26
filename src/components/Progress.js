import React from 'react'

function Progress({index , num_questions, points , max_points , answer}) {
  return (
    <header className='progress'>
        <progress max={num_questions} value={index+Number(answer!==null)}></progress>
        <p>Question <strong>{index+1}</strong> / {num_questions}</p>
        <p><strong>{points}</strong> / {max_points}</p>
    </header>

  )
}

export default Progress