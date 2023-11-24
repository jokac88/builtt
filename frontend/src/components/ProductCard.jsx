import {useState} from 'react';
import minus from '../assets/svg/minus.svg';
import plus from '../assets/svg/plus.svg';
import cart from '../assets/svg/cart.svg';

function ProductCard({product}) {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity - 1);

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
          <img src={`/img/${product.picture}.png`} alt={product.picture}/>
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
              <button onClick={decreaseQuantity} disabled={!quantity}>
                <img src={minus} alt={minus}/>
              </button>
              <p>{quantity}</p>
              <button onClick={increaseQuantity}>
                <img src={plus} alt={plus}/>
              </button>
            </div>
            <div>
              <button>
                <img src={cart} alt={cart}/>
              </button>
            </div>
          </div>
        </div>
        <h1>{product.name}</h1>
        <h1>{product.price} <sup>RSD</sup></h1>
      </div>
  )
}

export default ProductCard;
