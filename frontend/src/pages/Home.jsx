import { Suspense } from 'react';
import {
  Await, defer, json, useLoaderData,
} from 'react-router-dom';
import Loader from '../components/Loader';
import ProductsList from '../components/ProductsList';
import ErrorPage from './Error';

function HomePage() {
  const { products } = useLoaderData();

  return (
      <Suspense fallback={<Loader />}>
        <Await resolve={products} errorElement={<ErrorPage />}>
          {(resolvedPokemon) => <ProductsList productsList={resolvedPokemon} />}
        </Await>
      </Suspense>
  )
}

export default HomePage;

const loadProducts = async () => {
  const baseURL = 'http://localhost:4000/products';
  const response = await fetch(baseURL);

  if (!response.ok) {
    throw json({ message: 'Could not fetch details for selected pokemon.' }, { status: 500 });
  }

  const resData = await response.json();

  return resData.products;
};

export function loader() {
  return defer({
    products: loadProducts(),
  });
}
