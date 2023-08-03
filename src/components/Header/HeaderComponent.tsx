import { CarritoComponent } from "../Carrito/CarritoComponent";
import { useCart } from "../../context/CartContext";

export const HeaderComponent = () => {
  const { gemCount, cartItems } = useCart();

  return (
    <div className="bg-stone-700 py-4 px-4 flex justify-between items-center sticky top-0 shadow-md z-10">
      <h1 className="text-white text-2xl font-bold">🧙‍♂️ Potion Shop</h1>
      <div className="pr-24 flex items-center gap-4 ">
        <img src="./gem.png" alt="green-gem" />
        <h1>
          {gemCount} <span>Gemas</span>{" "}
        </h1>
      </div>

      <div className="relative">
        <div className="bg-sky-500/100 rounded-full w-7 flex justify-center">
          <h1>{cartItems.length}</h1>
        </div>
      </div>
      <CarritoComponent />
    </div>
  );
};
