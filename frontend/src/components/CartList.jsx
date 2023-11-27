import CartCard from './CartCard';

function CartList({cartList}) {
  return (
      <section className="flex-1">
        {cartList.map(product => (
            <CartCard key={product.id} product={product}/>
        ))}
      </section>
  )
}

export default CartList;
