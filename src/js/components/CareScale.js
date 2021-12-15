import React from "react";

function CareScale({scaleValue, careType}) {
    const range = [1, 2, 3]
    const scaleType = careType === 'light' ? '🌞' : '💧';
    const careTypeWord = careType === 'light' ? 'de lumière' : "d'eau";
    const rangeWord = [careTypeWord,'peu', 'modérement', 'beaucoup' ]

    return (
        <div>
            {range.map((rangeElem) =>
                scaleValue >= rangeElem && <span key={rangeElem.toString()} className="careType" onClick={() => alert(`Cette plante a besoin de ${rangeWord[scaleValue]} ${careTypeWord}`)}>{scaleType}</span>
            )}
        </div>
    )
}
    
export default CareScale