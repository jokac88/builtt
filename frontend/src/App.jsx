import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './pages/Root';
import HomePage, {loader as productsLoader} from './pages/Home';
import CartPage from './pages/Cart';
import LoginPage, {action as loginAction } from './pages/Login';
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
            element: <HomePage/>,
            loader: productsLoader
          },
          {
            path: 'cart',
            element: <CartPage/>
          },
        ]
      },
      {
        path: 'login',
        element: <LoginPage/>,
        action: loginAction
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App
