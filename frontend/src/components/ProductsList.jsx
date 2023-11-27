import ProductCard from './ProductCard';
import {useState} from "react";
import Modal from "./Modal.jsx";

function ProductsList({productsList}) {
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  return (
      <section className="relative">
        <h1 className="mb-[15px] md:mb-[30px] font-bold text-[20px] leading-[24px] tracking-[0.2px]">
          Svi proizvodi <span
            className="font-normal text-[15px] text-[#7F7F7F]">{productsList.length} {productsList.length === 1 ? 'proizvod' : 'proizvoda'}</span>
        </h1>
        <div
            className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 sm:gap-x-[15px]  2xl:gap-x-[23px] gap-y-[40px] 2xl:gap-y-[60px]">
          {productsList.map((product) => (
              <ProductCard
                  key={product.id}
                  product={product}
                  handleAddToCart={handleAddToCart}
              />
          ))}
        </div>
        <Modal isVisible={showModal}/>
      </section>
  )
}

export default ProductsList;
