export interface Welcome {
  productos: Producto[];
  compras: any[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  originalPrice: number;
}
