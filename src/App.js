import { useEffect, useReducer } from "react"
import Header from "./Header"
import Main from "./Main"
import Loader from './Loader'
import Error from './Error' 
import StartScreen from "./StartScreen"


const initial_state = {
    questions: [],
    //loading, error, ready, active, finished
    status: 'loading'
}

function reducer(state , action) {
    switch(action.type) {
        case 'data_recieved':
            return {
                ...state,
                questions: action.payload,
                status: 'ready'
            };
        case 'data_failed':
            return {
                ...state,
                status: 'error', 
            }

        default:
            throw new Error('action unknown')
    }
}


export default function App() {
    const [{questions , status} , dispatch] = useReducer(reducer , initial_state)

    const num_questions = questions.length;

    useEffect(function() {
        fetch('http://localhost:9000/questions')
        .then(res => res.json())
        .then(data => dispatch({type:'data_recieved' , payload:data}))
        .catch(err => dispatch({type:'data_failed' }));
    } , []);

    return (
        <div className='app'>
            <Header />

            <Main className="main">
             {status === 'loading' && <Loader />}
             {status === 'error' && <Error />}
             {status === 'ready' && <StartScreen num_questions={num_questions}/>}
            </Main>
        </div>
    )
}