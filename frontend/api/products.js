import {json} from "react-router-dom";

export const loadProducts = async () => {
  const baseURL = 'http://localhost:4000/products';
  const response = await fetch(baseURL);

  if (!response.ok) {
    throw json({message: 'Could not fetch products.'}, {status: 500});
  }

  const resData = await response.json();

  return resData.products;
};
