import React from "react";
import ProductList from "./components/ProductList";
import CartSummary from "./components/CartSummary";
import { useTheme } from "./context/ThemeContext";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-gradient-to-br from-purple-100 via-white to-blue-100 dark:bg-gradient-to-br dark:from-purple-800 dark:via-gray-700 dark:to-blue-800">
      <div className="max-w-6xl mx-auto px-4 py-8 ">
        <h1 className="text-3xl font-bold text-center mb-8 dark:text-[#fff]">
          🛒 My Store
        </h1>
        <button
          onClick={toggleTheme}
          className="bg-gray-200 dark:bg-gray-800 px-4 py-1 rounded text-sm"
        >
          <svg
            data-slot="icon"
            fill="none"
            stroke-width="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            ></path>
          </svg>
        </button>
        <CartSummary />
        <ProductList />
      </div>
    </div>
  );
};

export default App;
