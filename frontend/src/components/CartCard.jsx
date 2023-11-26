import {useDispatch} from 'react-redux';
import MinusIcon from './icons/MinusIcon';
import PlusIcon from './icons/PlusIcon';
import {useEffect, useState} from "react";
import {handleQuantityChange} from "../../util/handleQuantityChange.js";

function CartCard({product}) {
  const {id, name, description, weight, price, discountPrice, quantity, picture} = product;
  const dispatch = useDispatch();
  const [inputQuantity, setInputQuantity] = useState(quantity || 1);

  const decreaseQuantity = () => {
    setInputQuantity(inputQuantity - 1);
    dispatch({type: 'UPDATE_CART', product: {...product, quantity: inputQuantity - 1}});
  };

  const increaseQuantity = () => {
    setInputQuantity(inputQuantity + 1);
    dispatch({type: 'UPDATE_CART', product: {...product, quantity: inputQuantity + 1}});
  };

  const removeFromCart = id => dispatch({type: 'REMOVE_FROM_CART', id});

  // const increaseQuantity = id => dispatch({type: 'INCREASE_PRODUCT_QUANTITY', id});

  // const decreaseQuantity = id => dispatch({type: 'DECREASE_PRODUCT_QUANTITY', id});

  // const updateCart = (cart, id) => {
  //   const carProduct = cart.find((product) => product.id === id);
  //
  //   !carProduct ? dispatch({type: 'ADD_TO_CART', product}) : dispatch({type: 'UPDATE_CART', product});
  // };
  // const areQuantitiesEqual = (product, cart) => {
  //   const cartProduct = cart.find(item => item.id === product.id);
  //
  //   return cartProduct ? cartProduct.quantity === product.quantity : false;
  // };
  //
  // const isDisabled = (!quantity && !cart.some(item => item.id === product.id)) || areQuantitiesEqual(product, cart);

  const style = {
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '15px',
    backgroundColor: 'var(--light-grey)',
    height: '284px'
  };

  return (
      <section>
        <div style={style}>
          <div style={{display: 'flex'}}>
            <img src={`/assets/img/${picture}.png`} alt={picture}/>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <h1>{name}</h1>
                <h1>{weight}</h1>
                {description && <h1>{description}</h1>}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '15px',
                padding: '10px 15px',
                backgroundColor: 'white',
                borderRadius: '100px'
              }}>
                <button
                    onClick={decreaseQuantity}
                    className="product-card__button"
                    disabled={inputQuantity <= 1}>
                  <MinusIcon/>
                </button>
                <input
                    type="text"
                    value={inputQuantity}
                    onChange={(e) => setInputQuantity(handleQuantityChange(e))}
                    maxLength={2}
                />
                <button onClick={increaseQuantity}>
                  <PlusIcon/>
                </button>
                <button onClick={() => removeFromCart(id)}>
                  Ukloni
                </button>
              </div>
            </div>
          </div>
          <div>
            <h1>{(discountPrice || price) * inputQuantity} <sup>RSD</sup></h1>
            {discountPrice && <h1>{price * inputQuantity} <sup>RSD</sup></h1>}
          </div>
        </div>
        <hr/>
      </section>
  )
}

export default CartCard;
