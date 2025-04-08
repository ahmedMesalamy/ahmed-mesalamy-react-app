import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showDetails, setShowDetails] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-sm shadow-lg rounded-lg bg-white dark:bg-gray-800 p-4 z-50 border dark:border-gray-700">
      {/* Summary View */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-800 dark:text-gray-100">
            🛒 {totalItems} {totalItems === 1 ? "item" : "items"}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total: ${totalPrice}
          </p>
        </div>

        <button
          onClick={() => setShowDetails((prev) => !prev)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {showDetails ? "Hide Cart" : "View Cart"}
        </button>
      </div>

      {/* Full Cart Details */}
      {showDetails && cartItems.length > 0 && (
        <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between border-b pb-2"
            >
              <div className="w-4/5">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {item.title}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  ${item.price} × {item.quantity}
                </p>
              </div>
              <button
                className="text-xs text-red-500 hover:underline"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Empty cart message */}
      {showDetails && cartItems.length === 0 && (
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Your cart is empty.
        </p>
      )}
    </div>
  );
};

export default Cart;
