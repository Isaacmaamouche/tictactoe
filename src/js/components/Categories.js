import React from "react";
import "../../css/Categories.scss";

function Categories({plantList, categories, setCategories}){

    const categoriesList = plantList.reduce(
        (acc, plant) =>
            acc.includes(plant.category) ? acc : acc.concat(plant.category),
        []
    )

    function onMultiCatSelect(e){
        let checked = e.target.getAttribute('value');
        if(categories.includes(checked)){
            let upSelected = categories.filter(
                (cat) => cat !== checked
            )
            setCategories([...upSelected]);
        }else{
            setCategories([...categories, checked]);
        }
    }

function onAllCatSelect(e){
    setCategories([]);
    document.querySelectorAll("input").forEach(item => item.checked = false);

}
    return (
        <>
        <div className="cat_multiselect">
        <span className="cat_closeMenu" onClick={()=>document.querySelector(".revealCatMenu").classList.remove('revealCatMenu')}>╳</span>
            <ul>
                <li key="all_categories">
                    <label>
                        <input type="checkbox" value="all_categories" checked id="allCatSelect" onChange={(e) => onAllCatSelect(e)}/>
                        <span className="cat_name">Toutes les plantes</span>
                    </label>
                </li>
                
                {categoriesList.map((cat) => (
                    <li key={cat}>
                        <label>
                            <input type="checkbox" value={cat} onChange={(e) => onMultiCatSelect(e)}/>
                            <span className="cat_name">{cat}</span>
                        </label>
                    </li>
                
                ))}
            </ul>
        </div>
        </>
    )
}

export default Categories
