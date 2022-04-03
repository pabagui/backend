import { useContext } from "react";
import { productContext } from "../../context/Context";
import { addProductToCart, getCartById } from '../../api/cart/cart';

function Card({ product }) {
  const { setCart } = useContext(productContext);

  const addProduct = async () => {
    console.log(product);
    await addProductToCart(product);
    const result = await getCartById();

    setCart(result.products.length);
  };

  return (
    <>
      <div>
        <img src="https://i.ibb.co/DGr0LVV/amarillo.jpg" alt="alforja" />
        <h3>
          {product.name}
        </h3>
        <p>
          {product.description} Alforjas-mochila 
        </p>
        <p>{`${product.price}`}</p>
        <button
          onClick={addProduct}
        >
          Añadir al card
        </button>
      </div>
    </>
  );
}

export default Card();