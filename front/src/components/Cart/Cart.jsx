import { useState, useEffect, useContext } from "react";
import { productContext } from "../../context/Context";
import { getCartById } from '../../api/cart/cart';

function Cart() {
  const { cart, setCart } = useContext(productContext);
  const [message, setMessage] = useState({ show: false, status: "" });

  console.log("carrito", cart);

  useEffect(() => {
    console.log("cartEffect");
    getCartById().then((res) => {
      setCart(res.products.length);
      console.log("carrito", res.products.length);

      setMessage({ show: true, status: "en el status" });
      setTimeout(() => {
        setMessage({ show: false, status: "" });
      }, 5000);
    });
  }, []);

  return (
    <div>
      <div>
        {cart >= 1 ? (
          <p>
            {cart}
          </p>
        ) : null}

        <img src="/" alt="cart"/>
      </div>
    </div>
  );
}

export default Cart();