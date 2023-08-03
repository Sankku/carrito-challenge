import { useState, useEffect } from "react";
import { CarritoComponent } from "./components/Carrito/CarritoComponent";
import { HeaderComponent } from "./components/Header/HeaderComponent";
import { ListadoProductosComponent } from "./components/Products/ListadoProductosComponent";
import { Product } from "./types";
import CartProvider from "./context/CartContext";

function App() {
  const [showCarrito] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/productos")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <CartProvider>
      <div
        className="min-h-full bg-fixed"
        style={{ backgroundImage: "url(background.webp)" }}>
        <HeaderComponent />
        <div className="flex justify-center min-h-full">
          <div className="max-w-full w-7/12">
            {showCarrito ? (
              <CarritoComponent />
            ) : (
              <ListadoProductosComponent products={products} />
            )}
          </div>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
