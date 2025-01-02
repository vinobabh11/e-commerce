import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart, updateQuantity } from "../../redux/slices/cartSlice";

const CartDetails = () => {
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleQuantityChange = (id, newQuantity) => {
        dispatch(updateQuantity({ id, quantity: parseInt(newQuantity, 10) }));
    };

    return (
        <div className="flex-1 rounded shadow p-4 bg-gray-100 ">
            <div className="max-w-5xl mx-auto bg-white rounded shadow p-4">
                <h2 className="text-xl font-bold mb-4">Your Product</h2>
                {items?.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul>
                        {items?.map((item) => (
                            <li
                                key={item.id}
                                className="flex flex-col sm:flex-row sm:items-center gap-4 border-b py-4"
                            >
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="w-20 h-20 rounded self-center sm:self-start"
                                />

                                <div className="flex-1">
                                    <p className="font-bold text-lg">{item.title}</p>
                                    <p className="text-gray-600">Price: ${item.price}</p>

                                    <div className="mt-2">
                                        <label htmlFor={`quantity-${item.id}`} className="mr-2 text-sm text-gray-600">
                                            Quantity:
                                        </label>
                                        <select
                                            id={`quantity-${item.id}`}
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                            className="border border-gray-300 rounded p-1"
                                        >
                                            {[...Array(10).keys()].map((n) => (
                                                <option key={n + 1} value={n + 1}>
                                                    {n + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <p className="mt-2 font-bold text-gray-700">
                                        Total: ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>

                                <button
                                    className="text-red-500 self-start sm:self-center"
                                    onClick={() => dispatch(removeFromCart(item.id))}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                            onClick={() => dispatch(clearCart())}
                        >
                            Clear Cart
                        </button>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CartDetails;
