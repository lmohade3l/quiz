import React from 'react'

function Options({question , dispatch, answer}) {
  const has_answered = answer!==null;

  return (
    <div>
        <div className='options'>
        {question.options.map((option , index) => (
                              <button className={`btn btn-option 
                                                  ${index===answer? 'answer':''}
                                                  ${has_answered? index===question.correctOption?'correct':'wrong':''}`}
                                      onClick={()=> dispatch({type:'new_answer' , payload:index})} 
                                      key={option}
                                      disabled={has_answered}>
                                {option}
                              </button>))}
      </div>
    </div>
  )
}

export default Options