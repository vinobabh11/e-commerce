import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../../redux/slices/productSlice';

const Accordion = ({ filterButton, clearAll, onClearProcessed, storedFilter }) => {
    const [openSections, setOpenSections] = useState({});
    const [selectedItems, setSelectedItems] = useState({});
    const [data, setData] = useState([
        {
            id: 1,
            title: 'Categories',
            content: [],
        },
        {
            id: 2,
            title: 'Brand',
            content: [],
        },
    ]);

    const { items } = useSelector((state) => state.products);

    useEffect(() => {
        if (storedFilter) {
            setSelectedItems(storedFilter);
        }
    }, [storedFilter]);

    useEffect(() => {
        if (items.length) getFilter();
    }, [items])

    useEffect(() => {
        if (clearAll) {
            setSelectedItems({});
            console.log(clearAll, "clear");

            onClearProcessed();
        }
    }, [clearAll, onClearProcessed]);

    const getFilter = () => {
        const itemsCategories = items.map((item) => item?.category
            ? item.category.charAt(0).toUpperCase() + item.category.slice(1)
            : "");
        const itemsBrand = items.map((item) => item?.brand).filter((brand) => brand !== undefined);;

        const catArr = [...new Set(itemsCategories)];
        const brandArr = [...new Set(itemsBrand)];

        setData((prevData) =>
            prevData.map((filter) => {
                if (filter.title === "Categories") {
                    return { ...filter, content: [...catArr] };
                }
                if (filter.title === "Brand") {
                    return { ...filter, content: [...brandArr] };
                }
                return filter;
            })
        );
    };

    const toggleSection = (id) => {
        setOpenSections((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleCheckboxChange = (sectionId, item) => {
        const mapping = {
            "1": "categories",
            "2": "brand",
        };

        const updatedSelectedItems = {
            ...selectedItems,
            [sectionId]: {
                ...selectedItems[sectionId],
                [item]: !selectedItems[sectionId]?.[item],
            },
        };

        if (!updatedSelectedItems[sectionId][item]) {
            delete updatedSelectedItems[sectionId][item];
        }

        if (Object.keys(updatedSelectedItems[sectionId]).length === 0) {
            delete updatedSelectedItems[sectionId];
        }
        setSelectedItems(updatedSelectedItems);

        const result = Object.entries(updatedSelectedItems).reduce((acc, [key, value]) => {
            if (mapping[key]) {
                acc[mapping[key]] = Object.keys(value).filter((item) => value[item]);
            }
            return acc;
        }, {});

        filterButton(result, updatedSelectedItems);
    };

    return (
        <div id="accordion-collapse">
            {data.map((section) => (
                <div key={section.id} className="border-b border-gray-200">
                    <h2 id={`accordion-collapse-heading-${section.id}`}>
                        <button
                            type="button"
                            className="flex items-center justify-between w-full p-4 font-medium text-gray-700"
                            aria-expanded={!!openSections[section.id]}
                            onClick={() => toggleSection(section.id)}
                        >
                            <span>{section.title}</span>
                            <svg
                                className={`w-4 h-4 transform transition-transform ${!openSections[section.id] ? 'rotate-180' : ''
                                    }`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5 5 1 1 5"
                                />
                            </svg>
                        </button>
                    </h2>
                    {openSections[section.id] && (
                        <div
                            id={`accordion-collapse-body-${section.id}`}
                            aria-labelledby={`accordion-collapse-heading-${section.id}`}
                            className="p-4 bg-gray-50"
                        >
                            {section.content.map((item) => (
                                <div key={item} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`${section.id}-${item}`}
                                        checked={selectedItems[section.id]?.[item] || false}
                                        onChange={() => handleCheckboxChange(section.id, item)}
                                        className="w-4 h-4 text-gray-50 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor={`${section.id}-${item}`}
                                        className="ml-2 text-gray-600"
                                    >
                                        {item}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion;
