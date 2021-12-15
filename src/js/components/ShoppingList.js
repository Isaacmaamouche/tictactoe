import React from "react";
import '../../css/ShoppingList.scss';
import plantList from '../../datas/planList.js';
import PlantItem from './PlantItem.js';
import Categories from './Categories.js';
import { useState } from 'react';


function ShoppingList({cart, updateCart, cartHasItem, setCartHasItem}) {

    const [categories, setCategories] = useState([]);
    function SetMultiCategoryFilter(plant){
        if(categories.length > 0){
            return categories.includes(plant.category);
        }else{
            return true;
        }
    }

    return (
        <div className="lmj-plants">
            <Categories plantList={plantList} categories={categories} setCategories={setCategories}/>
                
            <ul className='lmj-plant-list'>
                {plantList.filter(
                    (plant) => SetMultiCategoryFilter(plant)
                    
                ).map(({name, id, category, price, cover, water, light, isBestSale, isSpecialOffer}) => (
                    <PlantItem 
                        key={name}
                        name={name}
                        id={id}
                        category={category}
                        price={price}
                        cover={cover}
                        water={water}
                        light={light}
                        isBestSale={isBestSale}
                        isSpecialOffer={isSpecialOffer}
                        cart={cart}
                        updateCart={updateCart}
                        cartHasItem={cartHasItem}
                        setCartHasItem={setCartHasItem}
                    />
                ))}               
            </ul>
        </div>
    )
};

export default ShoppingList; 