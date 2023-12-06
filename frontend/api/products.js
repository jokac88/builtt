import {json} from 'react-router-dom';

export const loadProducts = async () => {
  const baseURL = 'https://builtt-e10136fe5c38.herokuapp.com/products';
  const response = await fetch(baseURL);

  if (!response.ok) {
    throw json({message: 'Could not fetch products.'}, {status: 500});
  }

  const resData = await response.json();

  return resData.products;
};
