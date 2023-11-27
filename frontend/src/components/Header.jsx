import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import LogoIcon from './icons/LogoIcon';
import CartIcon from './icons/CartIcon.jsx';

function Header() {
  const calculatedQuantities = useSelector(state => state.cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0));

  return (
      <header className="sticky top-0 bg-[#F0F0F0] z-10 shadow shadow-neutral-400">
        <div className="flex justify-between items-center max-w-[1440px] 2xl:px-[70px] mx-[15px] md:mx-[30px] 2xl:mx-auto h-[70px]">
          <NavLink to="/" className="self-end pb-[10px]">
            <LogoIcon/>
          </NavLink>
          <NavLink to="/cart" className="relative">
            <CartIcon/>
            <span className="absolute top-[9px] left-[50%] translate-x-[-50%] text-[10px] leading-[10px]">{calculatedQuantities}</span>
          </NavLink>
        </div>
      </header>
  )
}

export default Header;
