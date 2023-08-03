// CartContext.tsx
import React, { ReactNode, createContext, useContext, useState } from "react";

interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
}

interface CartPurchases {
  id: number;
  name: string;
  category: string;
  price: number;
}

interface CartContextValue {
  cartItems: CartItem[];
  gemCount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  purchases: CartPurchases[];
  setPurchases: React.Dispatch<React.SetStateAction<CartPurchases[]>>;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartContext = createContext<CartContextValue | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [gemCount, setGemCount] = useState<number>(3);
  const [purchases, setPurchases] = useState<CartPurchases[]>([]);

  const removeFromCart = (itemId: number) => {
    //filtrar los items del carrito para eliminar el item con el id proporcionado
    const removedItem = cartItems.find((item) => item.id === itemId);
    if (!removedItem) {
      console.log("Ítem no encontrado en el carrito.");
      return;
    }

    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);

    // Aumentamos las gemas disponibles considerando el valor original del ítem eliminado
    setGemCount(gemCount + removedItem.originalPrice);

    setCartItems(updatedCartItems);
  };

  const checkPurchaseConditions = (category: string) => {
    const categoryCount = cartItems.reduce((acc, cartItem) => {
      if (cartItem.category === category) {
        return acc + 1;
      }
      return acc;
    }, 0);

    console.log(cartItems);

    if (categoryCount >= 1) {
      alert("Solo puedes comprar una poción de cada categoría.");
      return false;
    }

    return true;
  };

  const addToCart = (item: CartItem) => {
    // Verificar si el item ya está en el carrito
    if (cartItems.find((cartItem) => cartItem.id === item.id)) {
      alert("No se puede agregar el mismo ítem al carrito más de una vez.");
      return;
    }

    // Verificar si ya se alcanzó el límite de 3 gemas disponibles
    if (gemCount < item.price) {
      alert("No tienes suficientes gemas para comprar más ítems.");
      return;
    }

    // Verificar condiciones de compra adicionales
    if (!checkPurchaseConditions(item.category)) {
      return;
    }

    // Si todas las restricciones se cumplen, agregar el ítem al carrito y restar gemas
    setCartItems([...cartItems, { ...item, originalPrice: item.price }]);
    setGemCount(gemCount - item.price);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        gemCount,
        addToCart,
        removeFromCart,
        purchases,
        setPurchases,
        setCartItems,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
