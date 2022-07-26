import { useState, createContext, useContext, useEffect } from "react";

import { initiateCheckout } from "../lib/payment";

import products from '../products.json';

const defaultCart = {
  products: {},
};

export const CartContext = createContext();

export function useCartState () {

      const [cart, updateCart] = useState(defaultCart);

      // at the start of the refresh cycle, load the cart from local storage
      useEffect(() => {
        // local state from local storage
        const stateFromLocalStorage = window.localStorage.getItem('savedCart');
        // check if stateFromLocalStorage exists and parse the json file into a cart state object
        const data = stateFromLocalStorage && JSON.parse(stateFromLocalStorage);
        if ( data ) {
          updateCart(data);
        }
      }, []);
      
      // save cart state to local storage every time when cart state changes
      useEffect(() => {
        const data = JSON.stringify(cart);
        window.localStorage.setItem("savedCart", data);
      }, [cart]);
      

      const cartItems = Object.keys(cart.products).map((key) => {
        const product = products.find(({ id }) => `${id}` === `${key}`);
        return {
          ...cart.products[key],
          pricePerItem: product.price,
        };
      });
  

      const subtotal = cartItems.reduce((acc, { pricePerItem, quantity }) => {
        return acc + pricePerItem * quantity;
      }, 0);

      const quantity = cartItems.reduce((acc, { quantity }) => {
        return acc + quantity;
      }, 0);


      const addToCart = ({ id } = {}) => {
        updateCart((prev) => {
          let cart = { ...prev };

          if (cart.products[id]) {
            cart.products[id].quantity += 1;
          } else {
            cart.products[id] = {
              id: id,
              quantity: 1,
            };
          }

          return cart;
        });
      };


      const checkout = () => {
        initiateCheckout({
          // initiateCheckout({
          //   lineItems: [
          //     {
          //       price: id,
          //       quantity: 1,
          //     },
          //   ],
          // });
          lineItems: cartItems.map(({ id, quantity }) => {
            return {
              price: id,
              quantity: quantity,
            };
          }),
        });
      };

      return {
        cart,
        cartItems,
        updateCart,
        subtotal,
        quantity,
        addToCart, 
        checkout
      };
}

export const useCart = () => {
  const cart = useContext(CartContext);
  return cart;
};
