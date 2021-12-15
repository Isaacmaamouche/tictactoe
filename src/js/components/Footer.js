import React from "react";
import { useState } from 'react'
import '../../css/Footer.scss'

function Footer() {
	const [inputValue, setInputValue] = useState('');
    const [formState, setFormState] = useState('');
    
    const onSubmit = function(value){
        if(value !== ""){
            if(!value.includes('@')) alert("Votre adresse est incorrecte : Il n'y a pas de @ !");
            setFormState('submitted');
        }
    }

	return (
		<footer className='lmj-footer'>
			<div className='lmj-footer-elem'>
            La Maison Jungle - An Open Classroom Project<br/>
				Pour les passionné·e·s de plantes 🌿🌱🌵
			</div>
			<div className={`lmj-footer-elem mailForm ${formState}`}><p>Laissez-nous votre mail :</p>
                <form>
                    <input placeholder="Votre email" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                    <button type="submit" onClick={(e) =>{e.preventDefault();onSubmit(inputValue)}} >Je m'inscris</button>
                </form>
            </div>
            <div className={`lmj-footer-elem thxForm ${formState}`}>
                <p>Merci pour votre inscription !</p>
                
            </div>
		</footer>
	)
}

export default Footer