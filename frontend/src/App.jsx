import './App.css'
import store from '../store/index.js';
import {Provider} from 'react-redux';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './pages/Root';
import HomePage from './pages/Home';
import CartPage from './pages/Cart';
import LoginPage, {action as loginAction} from './pages/Login';
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
            element: <HomePage/>
            // loader: productsLoader
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
  return (
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
  );
}

export default App
