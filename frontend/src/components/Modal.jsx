function Modal({isVisible}) {
  const showModal= isVisible ? 'opacity-95' : 'opacity-0';

  return (
      <div className={`${showModal} fixed bottom-[15px] left-[15px] flex justify-center items-center px-[15px] py-[10px] shadow shadow-neutral-400 bg-[#ffffff] z-10 transition-[opacity] duration-[0.5s]`}>
        <h2 className="font-bold text-[20px]">Proizvod je dodat u korpu!&#127881;</h2>
      </div>
  )
}

export default Modal;
