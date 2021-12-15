import React from "react";
import { useState } from 'react';

function QuestionForm() {
    const [inputValue, setInputValue] = useState('')
    function checkValue(value) {
        if (!value.includes('f')) {
            setInputValue(value)
        }
    }
    return (
        <form>
            <textarea
                placeholder="Posez votre question ici"
                value={inputValue}
                onChange={(e) => checkValue(e.target.value)}
            />
            <button type='submit' onClick={(e) => {e.preventDefault();console.log(inputValue)}}>Entrer</button>
        </form>
    )
}

export default QuestionForm