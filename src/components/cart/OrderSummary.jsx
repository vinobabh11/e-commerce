import React from "react";
import { useSelector } from "react-redux";

const OrderSummary = () => {
    const {items} = useSelector((state) => state.cart);
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 0
    const total = subtotal + shipping;

    return (
        <div className="w-full lg:w-1/3 bg-white rounded shadow p-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>Free</span>
                </div>
                <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full">
                Checkout
            </button>
        </div>
    );
};

export default OrderSummary;
