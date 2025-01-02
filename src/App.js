import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { useEffect } from 'react';
import { fetchProducts } from './redux/slices/productSlice';
import ProductList from './pages/ProductList';
import Header from './components/Header';
import Cart from './components/cart/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetailModal from './components/product/ProductDetailModal';

function App() {
  const dispatch = useDispatch();
  const { openCart } = useSelector((state) => state.cart)
  const { openDetailModal } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      {openCart ? <Cart /> : <Header>
        <ProductList />
      </Header>}
      {openDetailModal ? <ProductDetailModal /> : ""}
      <ToastContainer />
    </div>
  );
}

export default App;
