import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts as fetchProductsAPI } from '../../api/products';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const products = await fetchProductsAPI();
    return products;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    openDetailModal: false,
    modalData: {},
    data: [],
    filterOpt: {},
  },
  reducers: {
    detailModal: (state, action) => {
      state.openDetailModal = action.payload.open;
      state.modalData = action.payload.product;
    },
    setFilter: (state, action) => {
      const { categories = [], brand = [] } = action.payload;
      let stringify = JSON.stringify(state.items);
      let filteredData = JSON.parse(stringify);

      const lowerCaseCategories = categories.map((category) => category.toLowerCase());

      const filteredItems = filteredData.filter((item) => {
        const matchesCategory = !categories.length || lowerCaseCategories.includes(item.category);
        const matchesBrand = !brand.length || brand.includes(item.brand);

        return matchesCategory && matchesBrand;
      });

      state.data = filteredItems;
    },
    clearAll: (state) => {
      state.data = state.items;
      state.filterOpt = {};
    },
    selectFilter: (state, action) => {
      state.filterOpt = action.payload;
    },
    sortFilter: (state, action) => {
      const { sortType } = action.payload;

      let sortedData = [...state.data];

      if (sortType === 'highToLow') {
        sortedData.sort((a, b) => b.price - a.price);
      } else if (sortType === 'lowToHigh') {
        sortedData.sort((a, b) => a.price - b.price);
      } else {
        sortedData = [...state.items];
      }

      state.data = sortedData;
    },
    searchProducts: (state, action) => {
      const query = action.payload.toLowerCase();

      if (!query) {
        state.data = state.items;
      } else {
        state.data = state.items.filter(
          (item) =>
            item.title.toLowerCase().includes(query)
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { detailModal, clearAll, setFilter, selectFilter, sortFilter, searchProducts } = productSlice.actions;

export default productSlice.reducer;
