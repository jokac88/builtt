import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../components/Loader';
import ProductsList from '../components/ProductsList';
import {loadProducts} from "../../api/products.js";

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
      products.length ? <ProductsList productsList={products}/> : <Loader/>
  )
}

export default HomePage;
