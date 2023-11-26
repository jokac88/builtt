import CartCard from "./CartCard";

function CartList({cartList}) {
  // const style = {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   columnGap: '15px',
  //   backgroundColor: 'var(--light-grey)',
  //   height: '284px'
  // };

  return (
      <section className="cart-list" style={{flex: '1'}}>
        {cartList.map(product => (
            <CartCard key={product.id} product={product}/>
        ))}
      </section>
  )
}

export default CartList;
