import { useState } from "react";

import products from '../products.json';

const defaultCart = {
  products: {},
};

export default function useCart () {

      const [cart, updateCart] = useState(defaultCart);

      console.log("cart", cart);

      const cartItems = Object.keys(cart.products).map((key) => {
        const product = products.find(({ id }) => `${id}` === `${key}`);
        return {
          ...cart.products[key],
          pricePerItem: product.price,
        };
      });

      console.log("cartItems", cartItems);

      const subtotal = cartItems.reduce((acc, { pricePerItem, quantity }) => {
        return acc + pricePerItem * quantity;
      }, 0);

      console.log("subtotal", subtotal);

      const quantity = cartItems.reduce((acc, { quantity }) => {
        return acc + quantity;
      }, 0);

      console.log("quantity", quantity);

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

      return {
        cart,
        subtotal,
        quantity,
        addToCart
      };
}