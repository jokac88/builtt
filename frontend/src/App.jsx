import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './pages/Root';
import ProductsPage from './pages/Products';
import CartPage from './pages/Cart';
import LoginPage from './pages/Login';
import ErrorPage from './pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage/>,
    children: [
      {
        element: <Layout/>,
        children: [
          {
            index: true,
            element: <ProductsPage/>
          },
          {
            path: 'cart',
            element: <CartPage/>
          },
        ]
      },
      {
        path: 'login',
        element: <LoginPage/>
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App
