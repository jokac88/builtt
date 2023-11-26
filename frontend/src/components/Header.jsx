import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import LogoIcon from './icons/LogoIcon';
import CartIcon from './icons/CartIcon';

function Header() {
  const calculatedQuantities = useSelector(state => state.cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0));

  const style = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 70px',
    height: '70px',
    backgroundColor: 'var(--light-grey)'
  };

  return (
      <header className="header" style={style}>
        <NavLink to="/" style={{alignSelf: 'flex-end', paddingBottom: '10px'}}>
          <div className="header__logo">
            <LogoIcon/>
          </div>
        </NavLink>
        <NavLink to="/cart" style={{position: 'relative'}}>
          <CartIcon/>
          <p className="header__count" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            margin: 0
          }}>{calculatedQuantities}</p>
        </NavLink>
      </header>
  )
}

export default Header;
