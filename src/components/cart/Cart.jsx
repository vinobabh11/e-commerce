import React from "react";
import { showCart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import CartDetails from "./CartDetails";
import OrderSummary from "./OrderSummary";

const Cart = () => {
  const dispatch = useDispatch();

  return (
    <div
      className="fixed inset-0 z-50 bg-white overflow-y-auto flex flex-col"
    >

      <div className="flex items-center justify-between p-4 border-b border-gray-200 w-full">
        <h3 className="w-[95%] text-center text-xl font-semibold text-gray-700">Your Cart</h3>
        <button
          onClick={() => dispatch(showCart(false))}
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-700 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
        >
          <svg
            className="w-3 h-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
            aria-hidden="true"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>

      <div className="w-full flex flex-col-reverse lg:flex-row p-4 gap-4">
        <CartDetails />
        <OrderSummary />
      </div>
    </div>
  );
};

export default Cart;
