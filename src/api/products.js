import axios from "axios";
import { axiosInstance } from "./axios";


export const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products');
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
  
      if (axios.isAxiosError(error)) {
        throw new Error('Failed to fetch products. Please try again later.');
      } else {
        throw new Error('An unexpected error occurred.');
      }
    }
  };