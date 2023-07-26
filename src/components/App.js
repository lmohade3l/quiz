import { useEffect, useReducer } from "react"
import Header from "./Header"
import Main from "./Main"
import Loader from './Loader'
import Error from './Error' 
import StartScreen from "./StartScreen"
import Question from "./Question"
import NextButton from "./NextButton"
import Progress from "./Progress"
import Finished from "./Finished"


const initial_state = {
    questions: [],
    //loading, error, ready, active, finished
    status: 'loading',
    index: 0,
    answer: null,
    points: 0
}

function reducer(state , action) {
    switch(action.type) {
        case 'data_recieved':
            return {...state, questions: action.payload, status: 'ready'};

        case 'data_failed':
            return {...state, status: 'error', };

        case 'start':
            return {...state, status: 'active'};

        case 'new_answer':
            const q = state.questions.at(state.index);
            const flag = action.payload === q.correctOption;
            return {...state, answer: action.payload, points: flag? state.points+q.points : state.points};

        case 'next_question':
            return {...state , index: state.index+1 , answer:null}

        case 'finish':
            return {...state, status:'finished' }

        default:
            throw new Error('action unknown')
    }
}


export default function App() {
    const [{questions , status, index, answer, points} , dispatch] = useReducer(reducer , initial_state)

    const num_questions = questions.length;
    const max_points = questions.reduce((acc,cur) => acc+cur.points ,0);

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
             {status === 'ready' && <StartScreen num_questions={num_questions} dispatch={dispatch}/>}
             {status === 'active' && (
                <>
                    <Progress index={index} num_questions={num_questions} points={points} max_points={max_points} answer={answer}/>
                    <Question question={questions[index]} dispatch={dispatch} answer={answer}/>
                    <NextButton dispatch={dispatch} answer={answer} index={index} num_questions={num_questions}/>
                </>)}
            {status==='finished' && <Finished points={points} max_points={max_points}/>}
            </Main>
        </div>
    )
}