import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import MinusIcon from './icons/MinusIcon';
import PlusIcon from './icons/PlusIcon';
import CartIcon from './icons/CartIcon.jsx';
import {handleQuantityChange} from '../../util/handleQuantityChange.js';
import {priceFormatter} from "../../util/priceFormatter.js";

function ProductCard({product, handleAddToCart}) {
  const {id, name, price, picture} = product;
  const formattedPrice = priceFormatter(price);
  const cart = useSelector(({cart}) => cart);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const updateCart = (cart, id) => {
    const cartProduct = cart.find((product) => product.id === id);

    !cartProduct ? dispatch({type: 'ADD_TO_CART', product: {...product, quantity}}) : dispatch({
      type: 'UPDATE_CART',
      product: {...product, quantity}
    });

    handleAddToCart();
  };

  const areQuantitiesEqual = (product, cart) => {
    const cartProduct = cart.find(item => item.id === product.id);

    return cartProduct ? cartProduct.quantity === quantity : false;
  };

  const isDisabled = (!quantity && !cart.some(item => item.id === product.id)) || areQuantitiesEqual(product, cart);

  return (
      <div className="flex flex-col gap-y-[16px]">
        <div className="group relative flex flex-1 justify-center items-center max-h-[284px] bg-[#F0F0F0]">
          <img className="object-cover" src={`/assets/img/${picture}.png`} alt={picture}/>
          <div
              className="absolute bottom-[8px] left-[8px] flex items-center gap-x-[6px] md:opacity-0 md:group-hover:opacity-100 duration-[0.5s]">
            <div className="flex gap-x-[12px] w-[98px] h-[35px] px-[12px] rounded-[100px] bg-white">
              <button
                  onClick={() => setQuantity(quantity - 1)}
                  className="disabled:cursor-not-allowed"
                  disabled={quantity <= 1}
              >
                <MinusIcon
                    className={`transition-[fill] duration-[0.5s] ${quantity <= 1 ? 'fill-[#CCCCCC]' : 'fill-[#000000]'}`}/>
              </button>
              <input
                  className="w-full tracking-[-0.16px] focus:border-black focus-visible:outline-none"
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(handleQuantityChange(e))}
                  maxLength={2}
              />
              <button onClick={() => setQuantity(quantity + 1)}>
                <PlusIcon/>
              </button>
            </div>
            <button
                onClick={() => updateCart(cart, id)}
                className="flex justify-center items-center w-[35px] h-[35px] rounded-[50%] bg-black transition-[background-color] duration-[0.5s] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed"
                disabled={isDisabled}
            >
              <CartIcon color="#FFFFFF"/>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-y-[6px]">
          <h2 className="font-bold text-[18px] leading-[24px]">{name}</h2>
          <p className="relative text-[24px] leading-[33px] tracking-[0.2px]">{formattedPrice}<sup
              className="absolute top-[3px] ml-[5px] text-[13px] leading-[16px] tracking-[0.5px]">RSD</sup></p>
        </div>
      </div>
  )
}

export default ProductCard;
