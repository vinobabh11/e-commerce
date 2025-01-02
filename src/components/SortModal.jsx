import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sortFilter } from "../redux/slices/productSlice";

const SortModal = () => {
    const [openSort, setOpenSort] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const dispatch = useDispatch();

    const options = [
        { id: 1, label: "None" },
        { id: 2, label: "Price: High to Low" },
        { id: 3, label: "Price: Low to High" },
    ];

    const handleCheckboxChange = (id) => {
        setSelectedOption(id);
        setOpenSort(!openSort);
        switch (id) {
            case 1:
                dispatch(sortFilter({ sortType: 'none' }))
                break;
            case 2:
                dispatch(sortFilter({ sortType: 'highToLow' }))
                break;
            case 3:
                dispatch(sortFilter({ sortType: 'lowToHigh' }))
                break;

            default:
                break;
        }
    };
    return (
        <div className="relative inline-block">
            <button
                className="text-gray-700 bg-white hover:bg-gray-200 focus:outline-none font-medium border border-gray-300 rounded-lg text-sm px-5 py-2.5"
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    setOpenSort(!openSort);
                }}
            >
                Sort
            </button>

            {openSort && (
                <div
                    id="dropdown"
                    className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                >
                    <ul
                        className="py-2 text-sm text-gray-700"
                        aria-labelledby="dropdownDefaultButton"
                    >
                        {options.map((option) => (
                            <li
                                key={option.id}
                                onClick={() => handleCheckboxChange(option.id)}
                                className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedOption === option.id ? "bg-gray-200" : ""
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedOption === option.id}
                                    readOnly
                                    className="form-checkbox h-4 w-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                                />
                                <label
                                    htmlFor={`checkbox-${option.id}`}
                                    className="ml-2 text-sm text-gray-700"
                                >
                                    {option.label}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SortModal;
