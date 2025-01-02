import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { shortDescription } from '../../common';
import { toast } from 'react-toastify';
import { detailModal } from '../../redux/slices/productSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="p-4 rounded shadow flex flex-col hover:border-gray-400 justify-between h-full focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium border">
      <div className="cursor-pointer flex-1" onClick={() => dispatch(detailModal({ open: true, product }))}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <h3 className="text-xl font-bold">{product.title}</h3>
        <p className="mt-2 text-gray-600">
          {shortDescription(product.description)}
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="font-semibold text-lg">${product.price}</span>
        <button
          onClick={handleAddToCart}
          className="text-gray-700 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium border border-gray-300 rounded-lg text-sm px-5 py-2.5 text-center shadow-md transition duration-300 ease-in-out"
        >
          Add to Basket
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
