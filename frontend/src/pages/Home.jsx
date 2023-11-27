import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import store from '../../store/index.js';
import {redirect} from 'react-router-dom';
import Loader from '../components/icons/Loader.jsx';
import ProductsList from '../components/ProductsList';
import {loadProducts} from '../../api/products.js';

function HomePage() {
  const products = useSelector(({products}) => products);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await loadProducts();

        dispatch({type: 'SET_PRODUCTS', products: response});
      } catch (error) {
        console.log(error)
      }
    }

    !products.length && fetchProducts();
  }, [dispatch]);

  return (
      products.length ? <ProductsList productsList={products}/> :
          <div className="w-[300px] mx-auto"><Loader color="black"/></div>
  )
}

export default HomePage;

export function loader() {
  const currentState = store.getState();
  const isLogged = currentState.isLogged;

  if (!isLogged) {
    return redirect('/login');
  }

  return null;
}
