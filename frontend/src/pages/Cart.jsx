import {useSelector} from 'react-redux';
import store from '../../store/index.js';
import {redirect} from 'react-router-dom';
import CartList from '../components/CartList';
import {priceFormatter} from "../../util/priceFormatter.js";

function CartPage() {
  const cart = useSelector(({cart}) => cart);
  const calculatedPrice = cart.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity, 0);
  const calculatedDiscountPrice = cart.reduce((accumulator, currentValue) => accumulator + (currentValue.discountPrice || currentValue.price) * currentValue.quantity, 0);

  return (
      <section className="cart">
        <h1 className="mb-[15px] md:mb-[30px] font-bold text-[20px] leading-[24px] tracking-[0.2px]">
          Tvoja korpa
        </h1>
        {cart.length ?
            <div className="flex flex-col 2xl:flex-row items-start 2xl:gap-x-[55px]">
              <CartList cartList={cart}/>
              <div className="2xl:sticky 2xl:top-[100px] w-full 2xl:basis-[454px] p-[25px] pb-[109px] bg-[#F6F6F6]">
                <h2 className="mb-[15px] md:mb-[30px] font-bold text-[18px] leading-[28px]">
                  Tvoja narudžbina
                </h2>
                <div className="flex justify-between items-center mb-[15px]">
                  <p className="leading-[28px]">Ukupno</p>
                  <p className="text-[18px] leading-[25px] tracking-[-0.2px]">
                    {priceFormatter(calculatedPrice)}
                    <sup className="top-[-10px] ml-[5px] text-[10px] leading-[12px] tracking-[0.4px]">RSD</sup>
                  </p>
                </div>
                <div className="flex justify-between  items-center mb-[15px]">
                  <p className="leading-[28px]">Ušteda</p>
                  <p className="text-[18px] leading-[25px] tracking-[-0.2px]">{calculatedPrice - calculatedDiscountPrice ? '-' : undefined}{priceFormatter(calculatedPrice - calculatedDiscountPrice)}
                    <sup className="top-[-10px] ml-[5px] text-[10px] leading-[12px] tracking-[0.4px]">RSD</sup>
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="leading-[28px]">Isporuka Daily Express*</p>
                  <p className="text-[12px] leading-[12px] tracking-[0.24px]">Besplatna</p>
                </div>
                <hr className="my-[15px] bg-[#979797]"/>
                <div className="flex justify-between items-center mb-[10px]">
                  <p className="leading-[28px]">Ukupno za uplatu</p>
                  <p className="text-[18px] leading-[25px] tracking-[-0.2px]">
                    {priceFormatter(calculatedDiscountPrice)}
                    <sup className="top-[-10px] ml-[5px] text-[10px] leading-[12px] tracking-[0.4px]">RSD</sup>
                  </p>
                </div>
                <p className="mb-[33px] text-[12px] leading-[12px] tracking-[0.24px]">Cena je sa uključenim PDV-om</p>
                <button
                    className="w-full px-[15px] pt-[13px] pb-[14px] rounded-[100px] bg-black text-[18px] text-white leading-[18px] transition-[background-color] duration-[0.5s]  hover:bg-neutral-900">
                  Prijavi se za brže plaćanje
                </button>
              </div>
            </div>
            :
            <p className="mb-[15px] md:mb-[30px] font-bold text-[20px] leading-[24px] tracking-[0.2px]">
              Korpa je prazna.
            </p>}
      </section>
  )
}

export default CartPage;

export function loader() {
  const currentState = store.getState();
  const isLogged = currentState.isLogged;

  if (!isLogged) {
    return redirect('/login');
  }

  return null;
}
