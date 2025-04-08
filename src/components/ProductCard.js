import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-md transition">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 mx-auto object-contain"
      />
      <h2 className="mt-4 font-semibold text-lg dark:text-[#fff]">
        {product.title}
      </h2>
      <p className="text-sm text-gray-600 dark:text-[#fff]">
        ${product.price.toFixed(2)}
      </p>
      <button
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => dispatch(addToCart(product))}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
