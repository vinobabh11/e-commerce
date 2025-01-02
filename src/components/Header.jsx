import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { showCart } from '../redux/slices/cartSlice';

const Header = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();

    return (
        <>
            <header>
                <nav className="bg-white border-b border-gray-200">
                    <div className="container mx-auto flex justify-between items-center p-4">
                        <span className={`text-xl font-bold text-gray-900 ${!isMenuOpen ? "block" : "hidden"}`}>
                            L O G O
                        </span>
                        <div className="flex items-center lg:order-2">
                            <div className={`${!isMenuOpen ? "block" : "hidden"}`}>
                                <span
                                    className="cursor-pointer text-gray-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                                >
                                    Log in
                                </span>
                                <span
                                    className="cursor-pointer text-gray-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                                    onClick={() => dispatch(showCart(true))}
                                >
                                    Cart
                                </span>
                            </div>
                            <button
                                type="button"
                                className="inline-flex items-center lg:hidden text-gray-500"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <span className="sr-only">Toggle menu</span>
                                <svg
                                    className={`w-6 h-6 ${isMenuOpen ? "hidden" : "block"}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                                <svg
                                    className={`w-6 h-6 ${isMenuOpen ? "block" : "hidden"}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div
                            className={`${isMenuOpen ? "block" : "hidden"
                                } lg:block lg:w-auto w-full`}
                        >
                            <ul className="flex flex-col lg:flex-row lg:space-x-8 items-center">
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-4 text-gray-800"
                                    >
                                        Tops
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-4 text-gray-800"
                                    >
                                        Bottoms
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-4 text-gray-800"
                                    >
                                        Dresses
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-4 text-gray-800"
                                    >
                                        Accessories
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-4 text-gray-800"
                                    >
                                        New Product
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            {children}
        </>
    )
}

export default Header
