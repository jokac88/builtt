import ProductCard from "./ProductCard";

function ProductsList({productsList}) {
  const style = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '60px 20px'
  }
  return (
      <section>
        <h2>Svi proizvodi <span>50 proizvoda</span></h2>
        <div style={style}>
          {productsList.map((product, index) => (
              <ProductCard key={index} product={product}/>
          ))}
        </div>
      </section>
  )
}

export default ProductsList;
