import {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import MinusIcon from './icons/MinusIcon';
import PlusIcon from './icons/PlusIcon';
import CartIcon from './icons/CartIcon';
import {handleQuantityChange} from "../../util/handleQuantityChange.js";

function ProductCard({product}) {
  const {id, name, price, picture} = product;
  const cart = useSelector(({cart}) => cart);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const updateCart = (cart, id) => {
    const cartProduct = cart.find((product) => product.id === id);

    !cartProduct ? dispatch({type: 'ADD_TO_CART', product: {...product, quantity}}) : dispatch({
      type: 'UPDATE_CART',
      product: {...product, quantity}
    });
  };

  const areQuantitiesEqual = (product, cart) => {
    const cartProduct = cart.find(item => item.id === product.id);

    return cartProduct ? cartProduct.quantity === quantity : false;
  };

  const isDisabled = (!quantity && !cart.some(item => item.id === product.id)) || areQuantitiesEqual(product, cart);

  const style = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    columnGap: '15px',
    backgroundColor: 'var(--light-grey)',
    height: '284px'
  };

  return (
      <div>
        <div style={style}>
          <img src={`/assets/img/${picture}.png`} alt={picture}/>
          <div style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            display: 'flex',
            alignItems: 'center',
            columnGap: '6px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '15px',
              padding: '10px 15px',
              backgroundColor: 'white',
              borderRadius: '100px'
            }}>
              <button
                  onClick={() => setQuantity(quantity - 1)}
                  className="product-card__button"
                  disabled={quantity <= 1}>
                <MinusIcon/>
              </button>
              <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(handleQuantityChange(e))}
                  maxLength={2}
              />
              <button onClick={() => setQuantity(quantity + 1)}>
                <PlusIcon/>
              </button>
            </div>
            <div>
              <button
                  onClick={() => updateCart(cart, id)}
                  disabled={isDisabled}
              >
                <CartIcon color="#FFFFFF"/>
              </button>
            </div>
          </div>
        </div>
        <h1>{name}</h1>
        <h1>{price} <sup>RSD</sup></h1>
      </div>
  )
}

export default ProductCard;
