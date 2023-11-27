import {useDispatch} from 'react-redux';
import MinusIcon from './icons/MinusIcon';
import PlusIcon from './icons/PlusIcon';
import {useState} from 'react';
import {handleQuantityChange} from '../../util/handleQuantityChange.js';
import {priceFormatter} from "../../util/priceFormatter.js";

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

  const removeFromCart = id => {
    const confirmDelete = window.confirm('Da li si siguran/na?');

    if (confirmDelete) {
      dispatch({type: 'REMOVE_FROM_CART', id});
    }
  };

  return (
      <div>
        <div className="flex flex-col md:flex-row md:justify-between gap-y-[15px] md:gap-x-[35px]">
          <div className="flex flex-1 gap-x-[15px] md:gap-x-[35px]">
            <div className="flex items-center basis-[180px] md:basis-[143px] md:min-h-[143px] bg-[#F0F0F0]">
              <img src={`/assets/img/${picture}.png`} alt={picture}/>
            </div>
            <div className="flex flex-col justify-between gap-y-[15px]">
              <div>
                <h2 className="font-bold text-[18px] leading-[24px]">{name}</h2>
                <p className="mb-[8px] text-[15px] leading-[23px]">{weight}</p>
                {description && <p className="text-[13px] text-[#545454] leading-[15px]">{priceFormatter(description)} RSD po kom.</p>}
              </div>
              <div className="flex items-center gap-x-[25px]">
                <div
                    className="flex items-center gap-x-[12px] w-[105px] h-[35px] px-[12px] border-solid border border-black rounded-[18px]">
                  <button
                      onClick={decreaseQuantity}
                      className="disabled:cursor-not-allowed"
                      disabled={inputQuantity <= 1}
                  >
                    <MinusIcon
                        className={`transition-[fill] duration-[0.5s] ${quantity <= 1 ? 'fill-[#CCCCCC]' : 'fill-[#000000]'}`}/>
                  </button>
                  <input
                      type="text"
                      className="w-full tracking-[-0.16px] focus:border-black focus-visible:outline-none"
                      value={inputQuantity}
                      onChange={(e) => setInputQuantity(handleQuantityChange(e))}
                      maxLength={2}
                  />
                  <button onClick={increaseQuantity}>
                    <PlusIcon/>
                  </button>
                </div>
                <button
                    className="border-b-[1.5px] border-black transition-all duration-[0.5s]  hover:text-neutral-800 hover:border-neutral-800"
                    onClick={() => removeFromCart(id)}>
                  Ukloni
                </button>
              </div>
            </div>
          </div>
          <div>
            <p className="mb-[7px] text-[24px] leading-[33px] tracking-[-0.24px]">
              {priceFormatter((discountPrice || price) * inputQuantity)} <sup
                className="top-[-8px] mt-[15px] text-[13px] leading-[16px] tracking-[0.52px]">RSD</sup></p>
            {discountPrice && <p className="text-[#C94D00] text-[16px] leading-[18px] tracking-[-0.16px]"><span
                className=" line-through">{priceFormatter(price * inputQuantity)}</span> <sup
                className="text-[11px] leading-[16px] tracking-[0.44px]">RSD</sup></p>}
          </div>
        </div>
        <hr className="my-[25px]"/>
      </div>
  )
}

export default CartCard;
