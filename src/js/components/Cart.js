import React from "react";
import '../../css/Cart.scss';
const CartLogo = './src/img/icons8-shopping-cart-24.png';
import { useState } from 'react';
import { useEffect } from 'react';

function Cart({cart, updateCart, cartHasItem, setCartHasItem}){

    const [isOpen, setIsOpen] = useState(cart.length>0);
    let cartTotal = cart.reduce(
        (acc, item) => acc + item.qty * item.price, 0);
    
    useEffect(() => {
        document.title = `LMJ: ${cartTotal}€ d'achats`;
    }, [cartTotal])

   
    function deleteItem(item){
        let newCart = cart.filter(
            (cartItem) => cartItem.name !== item.name
        );
        
        updateCart([...newCart]);
        setCartHasItem(newCart.length>0)
    }

    function removeItem(item){
        let plantInCart = cart.find(plant => plant.name === item.name)
        let newCart = cart.filter(
            (plant) => plant.name !== item.name
        )
        if(plantInCart.qty>1){
            updateCart([...newCart, {"name":item.name, "price":item.price, qty:plantInCart.qty - 1}]);
        }else{
            deleteItem(item);
        }
    }

    function addItem(item){
        let plantInCart = cart.find(plant => plant.name === item.name)
        let newCart = cart.filter(
            (plant) => plant.name !== item.name
        )
        updateCart([...newCart, {"name":item.name, "price":item.price, qty:plantInCart.qty + 1}]);
    }
    let sortedCart = cart.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });

    return isOpen ? (
        <>
        <div className="lmj-cart">
            <h2>Panier</h2>

            {cartHasItem ? (<><ul>{sortedCart.map((cartItem, index) => {
                return (

                    <li key={`${index}_${cartItem.name}`}>
                        <div className="actionOnItem">
                            <span className="deleteItem" onClick={() => deleteItem(cartItem)}>x</span>
                            <span className="removeItem" onClick={() => removeItem(cartItem)}>-</span>
                            <span className="addItem" onClick={() => addItem(cartItem)}>+</span>
                        </div>

                        {cartItem.qty} {cartItem.name} : {cartItem.price * cartItem.qty}€
                    </li>

                );
            })}
            </ul>
                <h3>Total: {cartTotal}€</h3>
                <button onClick={() => { updateCart([]); setCartHasItem(false); } }>Vider le panier</button></>)

                : <><h3>Votre panier est vide.</h3></>}

            <button className="closeCart" onClick={() => setIsOpen(false)}>╳</button>
            
        </div>
        <button className="openCart" onClick={() => setIsOpen(true)}>{(cart.length>0) && cart.length}<img src={CartLogo} alt="Shopping Cart icon by Icons8"/></button>
        </>

    ) : (
        <>
        <div className="lmj-cart lmj-cart-closed">
            <h2>Panier</h2>
            
            {cartHasItem ? (<><ul>{sortedCart.map((cartItem, index) => {
                return (
                
                    <li key={`${index}_${cartItem.name}`}>
                        <div className="actionOnItem">
                            <span className="deleteItem" onClick={() => deleteItem(cartItem)}>x</span>
                            <span className="removeItem" onClick={() => removeItem(cartItem)}>-</span>
                            <span className="addItem" onClick={() => addItem(cartItem)}>+</span>
                        </div>

                        {cartItem.qty} {cartItem.name} : {cartItem.price * cartItem.qty}€
                    </li>
                
                )})}
                </ul>
                <h3>Total : {cartTotal}€</h3>
                <button onClick={() => {updateCart([]);setCartHasItem(false);}}>Vider le panier</button></>)

            : <><h3>Votre panier est vide.</h3></>}

            <button className="closeCart" onClick={() => setIsOpen(false)}>╳</button>
            
        </div>
        <button className="openCart" onClick={() => setIsOpen(true)}>{(cart.length>0) && cart.length}<img src={CartLogo} alt="Shopping Cart icon by Icons8"/></button>
        </>
    )
    
    
}


export default Cart