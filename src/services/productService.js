const BASE_URL = "https://fakestoreapi.com/products";

export async function fetchProducts() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
