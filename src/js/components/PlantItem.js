import React from "react";
import '../../css/PlantItem.scss';
import CareScale from './CareScale.js';


function PlantItem({name, id, category, price, cover, water, light, isBestSale, isSpecialOffer, cart, updateCart, cartHasItem, setCartHasItem}){  
    
    function addToCart(cart, name, price){
        let plantInCart = cart.find(plant => plant.name === name);
        if(plantInCart){
            let newCart = cart.filter(
                (plant) => plant.name !== name
            )
            updateCart([...newCart, {"name":name, "price":price, qty:plantInCart.qty + 1}]);
           
        }else{
            updateCart([...cart, {"name":name, "price":price, "qty":1}]);
        };
        setCartHasItem(true);
    } 

    return (
        <li key={`${id}_${name}`} data-key={`${id}_${name}`} className={`lmj-plant-item ${category}`}>
            <div className="lmj-plant-item-cover">
                <img src={cover} alt={`${name} cover produit`}/>
                <span className="lmj-plant-item-price">{price} €</span>
                {isSpecialOffer && <div className="lmj-sales">En solde !</div>}
            </div>
            <div className="lmj-plant-item-info">
                <span>{name}{isBestSale && ' 🏆'}</span>
                <br/>
                <span>{category}</span>
                <CareScale careType='light' scaleValue={light} />
                <CareScale careType='water' scaleValue={water} />
                <button className="addCart" onClick={() => addToCart(cart,name,price)}>
                    Ajouter au panier
                </button>
            </div>
        </li>
    )
}

export default PlantItem