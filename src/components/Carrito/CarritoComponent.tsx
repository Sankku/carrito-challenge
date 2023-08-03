import "./Carrito.css";
import { CartIcon, ClearCartIcon } from "../icons";
import { useCart } from "../../context/CartContext";
import { useId, useState } from "react";

export function CarritoComponent() {
  const cartCheckboxId = useId();
  const { cartItems, setCartItems, removeFromCart, purchases, setPurchases } =
    useCart();
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);

  const checkPurchaseAndUpdate = (category: string) => {
    const categoryCount = purchases.reduce((acc, purchase) => {
      if (purchase.category === category) {
        return acc + 1;
      }
      return acc;
    }, 0);

    if (categoryCount >= 1) {
      alert("Solo puedes comprar una poción de cada categoría.");
      return false;
    }

    return true;
  };

  const handleRemoveFromCart = (itemId: number) => {
    removeFromCart(itemId);
  };

  const handlePurchase = () => {
    const categoriesToCheck = cartItems.map((item) => item.category);
    for (const category of categoriesToCheck) {
      if (!checkPurchaseAndUpdate(category)) {
        return;
      }
    }
    setPurchases([...purchases, ...cartItems]);
    setPurchaseCompleted(true);
    setCartItems([]);

    setTimeout(() => {
      setPurchaseCompleted(false);
    }, 1500);
  };

  return (
    <>
      <label className="cart-button" htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input type="checkbox" id={cartCheckboxId} hidden />

      <aside className="cart">
        {purchaseCompleted ? (
          <h1 className="flex justify-center">
            ¡Compra realizada! Gracias por tu compra
          </h1>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div>
                  <h1>
                    {item.name} <p>{item.price} Gema </p>
                  </h1>
                </div>
                <img src={item.image} alt={item.name} />
                <button
                  className="clear-button"
                  onClick={() => handleRemoveFromCart(item.id)}>
                  <ClearCartIcon />
                </button>
              </li>
            ))}
          </ul>
        )}
        {cartItems.length > 0 && (
          <button
            className={`btn-purchase ring-2 ring-purple-500 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900`}
            onClick={handlePurchase}>
            Comprar
          </button>
        )}
        <div className="compras">
          <h1>Ítems Comprados</h1>
          <ul>
            {purchases.map((item) => (
              <li key={item.id}>
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
