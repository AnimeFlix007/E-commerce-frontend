import { createContext, useState } from "react";

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  function getProductQuantity(item) {
    const quantity = cartProducts.find(
      (product) => product._id === item._id
    )?.quantity;
    if (!quantity) {
      return 0;
    }
    return quantity;
  }
  // [{_id: 1, qty: 2}, {_id:2, qty: 1 }]
  function addToCart(item) {
    const quantity = getProductQuantity(item);

    if (quantity === 0) {
      setCartProducts([...cartProducts, { ...item, quantity: 1 }]);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product._id === item._id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }
  function removeOneFromCart(item) {
    const quantity = getProductQuantity(item);

    if (quantity === 1) {
      deleteFromCart(item);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product._id === item._id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function deleteFromCart(item) {
    setCartProducts(cartProducts.filter((product) => product._id !== item._id));
  }

  function getTotalCost(item) {
    const totalCost = cartProducts.reduce((acc, product) => {
        return acc + (product.quantity * product.Price)
    }, 0)

    return totalCost
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
