import Card from "../Card/Card";


function ProductList({ products }) {
  console.log("lista", products);
  return (
    <section>
      {products.map((prod) => (
        <Card key={prod.id} product={prod} />
      ))}
    </section>
  );
}

export default ProductList();