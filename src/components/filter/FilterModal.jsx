import React, { useEffect, useState } from "react";
import Accordian from "./Accordian";
import { useDispatch, useSelector } from "react-redux";
import { clearAll, selectFilter, setFilter } from "../../redux/slices/productSlice";

const FilterModal = ({ setOpenFilter }) => {
  const [buttonDisable, setButtonDisable] = useState(true);
  const [clear, setClear] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({});
  const [selectedState, setSelectedState] = useState({});
  const { filterOpt } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(filterOpt).length) {
      setSelectedFilter(filterOpt);
      setSelectedState(filterOpt);
      setButtonDisable(false);
    }
  }, [filterOpt]);

  const filterButton = (data, selectedData) => {
    if (Object.keys(data)?.length) {
      setSelectedFilter(data);
      setSelectedState(selectedData);
      setButtonDisable(false);
    } else {
      setButtonDisable(true)
    }
  }

  const handleOnApply = (e) => {
    e.preventDefault();
    dispatch(setFilter(selectedFilter))
    dispatch(selectFilter(selectedState));
    setOpenFilter(false);
  }

  const handleClearProcessed = () => {
    setClear(false);
  };
  const handleClearAll = () => {
    setClear(true);
    dispatch(clearAll());
    setSelectedFilter({});
    setSelectedState({});
    setButtonDisable(true);
  };

  return (
    <div className="fixed top-0 right-0 z-50 lg:w-1/3 md:w-1/2 sm:w-3/4 w-full h-full bg-white shadow-lg flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-700">All Filters</h3>
          <button
            onClick={setOpenFilter}
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
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Accordian
          filterButton={filterButton}
          clearAll={clear}
          storedFilter={filterOpt}
          onClearProcessed={handleClearProcessed}
        />
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-4">
          <button
            className="cursor-pointer bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 transition duration-300"
            onClick={() => handleClearAll()}
          >
            Clear All
          </button>
          <button
            className="cursor-pointer bg-white text-gray-500 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 hover:text-gray-700 focus:ring-4 focus:ring-gray-200 transition duration-300"
            disabled={buttonDisable}
            onClick={handleOnApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;

