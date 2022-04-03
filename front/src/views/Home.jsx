import { useEffect, useContext } from "react";
//import { getProducts } from "../../api/products";
//import { productContext } from "../../context/Context";
//import ProductList from "../../components/ProductList";
//import Form from "../../components/Form";
//import Cart from "../../components/Cart";
import { getProducts } from '../api/products/products'
import { productContext } from '../context/Context'
import ProductList from '../components/ProductList/ProductList'
import Form from '../components/Form/Form'
import Cart from '../components/Cart/Cart'


export default function Home() {
  const { products, setProducts } = useContext(productContext);

  useEffect(() => {
    console.log("use effect");
    getProducts().then((products) => setProducts(products));
  }, [setProducts]);

  return (
    <>
      <Cart />
      <h1>
        ecommerce de K'epe Bags
      </h1>
      <ProductList products={products} />
      <Form />
    </>
  );
}