import logo from '../../public/logo.svg';
import cart from '../assets/svg/cart.svg';

function Header() {
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
        <div style={{alignSelf: 'flex-end', paddingBottom: '10px'}}>
          <img
              className="header__logo"
              src={logo}
              alt={logo}
          />
        </div>
        <div style={{position: 'relative'}}>
          <img
              className="header__cart"
              src={cart}
              alt={cart}
          />
          <p className="header__count" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            margin: 0
          }}>0</p>
        </div>
      </header>
  )
}

export default Header;
