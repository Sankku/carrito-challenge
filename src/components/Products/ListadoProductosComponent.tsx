import { useCart } from "../../context/CartContext";
import { type Product } from "../../types";
import "./Products.css";

interface Props {
  products: Product[];
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Proteccion":
      return "bg-stone-500";
    case "Veneno":
      return "bg-green-500";
    case "Salud":
      return "bg-red-500";
    case "Estamina":
      return "bg-pink-500";
    case "Mana":
      return "bg-sky-500";
    default:
      return "bg-grey-500"; // Color predeterminado
  }
};

export const ListadoProductosComponent = ({ products }: Props) => {
  const { addToCart, cartItems, purchases, gemCount } = useCart();

  const isItemInCart = (productId: number) => {
    return (
      cartItems.some((cartItem) => cartItem.id === productId) ||
      purchases.some((purchase) => purchase.id === productId)
    );
  };

  const handleAddToCart = (productId: number) => {
    const productToAdd = products.find((product) => product.id === productId);

    if (productToAdd) {
      addToCart(productToAdd);
    }
  };

  return (
    <main className="products">
      <ul>
        {products.map((products) => {
          const categoryColor = getCategoryColor(products.category);
          const isDisabled =
            gemCount < products.price || isItemInCart(products.id);

          return (
            <li key={products.id} className="bg-stone-700">
              <div className="card-header">
                <h1 className={`category ${categoryColor}`}>
                  {products.category}
                </h1>
                <h1 className="btn price self-end">{products.price} Gema</h1>
              </div>
              <img
                className="self-center"
                src={products.image}
                alt={products.name}
              />
              <div>
                <h1>{products.name}</h1>
                <p>{products.description}</p>
              </div>
              <button
                className="btn-primary btn-purchase ring-2 ring-purple-500 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900"
                onClick={() => handleAddToCart(products.id)}
                disabled={isDisabled}>
                Agregar
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
};
