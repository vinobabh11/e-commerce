import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/product/ProductCard";
import FilterModal from "../components/filter/FilterModal";
import SortModal from "../components/SortModal";
import { clearAll, searchProducts } from "../redux/slices/productSlice";

const ProductList = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const { status, error, data } = useSelector((state) => state.products);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchProducts(searchQuery));
  };

  const handleClear = () => {
    setSearchQuery('');
    dispatch(clearAll());
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="flex items-center gap-4 my-1 max-w-screen-lg mx-auto">
        <form className="flex-grow" onSubmit={handleSearch}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg bg-white focus:ring-gray-500 focus:border-gray-500"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
            <div className="absolute right-2.5 bottom-2.5">
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="ml-2 text-gray-700 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Clear
                </button>
              )}
              <button
                type="submit"
                className="text-gray-700 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>

            </div>


          </div>
        </form>

        <button
          className="text-gray-700 bg-white hover:bg-gray-200 focus:outline-none font-medium border border-gray-300 rounded-lg text-sm px-5 py-2.5"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setOpenFilter(!openFilter);
          }}
        >
          Filter
        </button>

        <SortModal />

      </div>

      <div className="my-1">
        Showing <b>{data?.length}</b> results.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {openFilter ? (
        <FilterModal setOpenFilter={() => setOpenFilter(false)} />
      ) : (
        ""
      )}
    </>
  );
};

export default ProductList;
