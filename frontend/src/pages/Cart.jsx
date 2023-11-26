import {useSelector} from 'react-redux';
import CartList from "../components/CartList";

function CartPage() {
  const cart = useSelector(({cart}) => cart);
  const calculatedPrice = cart.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity, 0);
  const calculatedDiscountPrice = cart.reduce((accumulator, currentValue) => accumulator + (currentValue.discountPrice || currentValue.price) * currentValue.quantity, 0);
  // const calculatedQuantities = useSelector(state => state.cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0));

  return (
      <section className="cart">
        <h1>Tvoja korpa</h1>
        <div style={{display: 'flex'}}>
          <CartList cartList={cart}/>
          <div style={{backgroundColor: 'var(--light-grey)'}}>
            <h4>Tvoja narudžbina</h4>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <p>Ukupno</p>
              <p>{calculatedPrice}</p>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <p>Ušteda</p>
              <p>-{calculatedPrice - calculatedDiscountPrice}</p>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <p>Isporuka Daily Express*</p>
              <p>Besplatna</p>
            </div>
            <hr/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <p>Ukupno za uplatu</p>
              <p>{calculatedPrice}</p>
            </div>
            <p>Cena je sa uključenim PDV-om</p>
            <button>Prijavi se za brže plaćanje</button>
          </div>
        </div>
      </section>
  )
}

export default CartPage;
