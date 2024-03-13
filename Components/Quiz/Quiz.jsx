import React, { useEffect, useRef, useState } from 'react';
import { data } from '../../assets/data';
import './Quiz.css';

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0); // Corrected the setter function name
    const [result, setResult] = useState(false);

    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);

    useEffect(() => {
        setQuestion(data[index]);
    }, [index]);

    let option_array = [Option1, Option2, Option3, Option4];

    const checkAns = (e, ans) => {
        if (!lock) {
            setLock(true); // Lock the question on the first choice
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setScore(prev => prev + 1); // Correctly increment the score
            } else {
                e.target.classList.add("wrong");
                option_array[question.ans - 1].current.classList.add("correct");
            }
        }
    };

    const nextQuestion = () => {
        if (lock) {
            if (index === data.length - 1) { // Corrected typo in 'length'
                setResult(true);
                // Consider showing results or handling end of quiz here
            } else {
                setIndex(prevIndex => prevIndex + 1); // Correct way to update based on previous state
                setLock(false); // Unlock for the next question
                // Reset styles for all options
                option_array.forEach(option => {
                    if (option.current) {
                        option.current.classList.remove("wrong", "correct");
                    }
                });
            }
        }
    };

    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            <h2>{index + 1}. {question.question}</h2>
            <ul>
                <li ref={Option1} onClick={(e) => { checkAns(e, 1); }}>{question.option1}</li>
                <li ref={Option2} onClick={(e) => { checkAns(e, 2); }}>{question.option2}</li>
                <li ref={Option3} onClick={(e) => { checkAns(e, 3); }}>{question.option3}</li>
                <li ref={Option4} onClick={(e) => { checkAns(e, 4); }}>{question.option4}</li>
            </ul>
            <button onClick={nextQuestion}>Next</button>
            <div className="index">{index + 1} of {data.length} questions</div>
            {result && <div className="score">Your score: {score}</div>} {/* Displaying the score at the end of the quiz */}
        </div>
    );
};

export default Quiz;