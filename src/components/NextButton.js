import React from 'react'

function NextButton({dispatch, answer, index, num_questions}) {
    if(answer === null) return null;

    if(index < num_questions-1) return (
        <button className='btn btn-ui' onClick={()=> dispatch({type:'next_question'})}>
            Next
        </button>
    )

    if(index === num_questions-1) return (
        <button className='btn btn-ui' onClick={()=> dispatch({type:'finish'})}>
            Finish!
        </button>
    )
}

export default NextButton