import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailModal } from '../../redux/slices/productSlice';

const ProductDetailModal = () => {
  const dispatch = useDispatch();
  const { modalData } = useSelector((state) => state.products);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => dispatch(detailModal({ open: false, product: {} }))}
      ></div>

      <div className="relative w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 max-h-screen bg-white shadow-lg overflow-y-auto rounded-lg sm:rounded-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700">Product</h3>
          <button
            onClick={() => dispatch(detailModal({ open: false, product: {} }))}
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

        <div className="p-4 space-y-4">
          <div className="w-full h-60 flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={modalData.thumbnail}
              alt={modalData.title}
              className="max-w-full max-h-60 object-contain"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold">{modalData.title}</h3>
            <p className="mt-2 text-gray-600">{modalData.description}</p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="font-semibold text-lg">${modalData.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
