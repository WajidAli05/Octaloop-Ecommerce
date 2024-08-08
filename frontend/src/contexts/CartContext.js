import { createContext , useState , useEffect } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{cart , setCart}} >
      {children}
    </CartContext.Provider>  
  )

}

export { CartContext, CartProvider };