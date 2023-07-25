import { useReducer } from "react";

const initial_state = {count:0 , step:1}

function reducer (state , action) {
  switch(action.type) {
    case 'dec':
      return {...state, count:state.count - state.step}
    case 'inc':
      return {...state, count:state.count + state.step}
    case 'set_count':
      return {...state, count:action.payload}
    case 'set_step':
      return {...state , step:action.payload}
    case 'reset':
      return initial_state
    default:
      throw new Error('unknown action');
  }
  // if(action.type === 'inc')  return state + action.payload
  // if(action.type === 'dec')  return state - action.payload  //FIXME why mines?
  // if(action.type === 'set_count')  return action.payload 
}


function DateCounter() {
  const [state , dispatch] = useReducer(reducer , initial_state);
  const {count , step} = state;


  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({type:'dec' , payload:-1})
  };

  const inc = function () {
    dispatch({type:'inc' , payload:1})
  };

  const defineCount = function (e) {
    dispatch({type: 'set_count' , payload:Number(e.target.value)});
  };

  const defineStep = function (e) {
    dispatch({type:'set_step' , payload:Number(e.target.value)})
  };

  const reset = function () {
    dispatch({type:'reset'})
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
