import store from '../store/index.js';
import {Provider} from 'react-redux';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './pages/Root';
import HomePage, {loader as homeLoader} from './pages/Home';
import CartPage, {loader as cartLoader} from './pages/Cart';
import LoginPage, {action as loginAction} from './pages/Login';
import ErrorPage from './pages/Error';
import './index.css';

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
            loader: homeLoader
          },
          {
            path: 'cart',
            element: <CartPage/>,
            loader: cartLoader
          },
        ]
      },
      {
        path: 'login',
        id: 'login',
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
