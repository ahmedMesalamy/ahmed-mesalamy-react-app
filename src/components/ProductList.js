import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import ProductCard from "./ProductCard";
import useDebounce from "../hooks/useProducts";

const PRODUCTS_PER_PAGE = 6;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [allCategories, setAllCategories] = useState(["all"]);

  const debouncedSearch = useDebounce(search);
  const [error, setError] = useState(null);
  useEffect(() => {
    const categories = ["all", ...new Set(products.map((p) => p.category))];
    setAllCategories(categories);
  }, [products]);

  // Filtered list
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());
    const matchCategory = category === "all" || p.category === category;
    return matchSearch && matchCategory;
  });

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PRODUCTS_PER_PAGE);
  };

  if (loading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      {/* Search & Category Filters */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded p-2 w-full sm:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredProducts.length && (
        <div className="text-center mt-6">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
