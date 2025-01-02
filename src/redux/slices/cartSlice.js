import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    openCart: false, 
    items: [],
    total: 0,
  },
  reducers: {
    showCart: (state, action) => {
      state.openCart = action.payload;
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.items.find((item) => item.id === id);

      if (product) {
        product.quantity = quantity;
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const productIndex = state.items.findIndex((item) => item.id === productId);
      if (productIndex >= 0) {
        const product = state.items[productIndex];
        state.items.splice(productIndex, 1);
        state.total -= product.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, showCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
