import { useState, useContext } from "react";
import { createProduct } from '../../api/products/products';
import { productContext } from "../../context/Context";

function Form() {
  const initialValues = {
    name: "",
    description: "",
    price: "",
    stock: "",
    prodId: "",
    thumbnail: "",
  };
  const [newProduct, setNewProduct] = useState(initialValues);
  const [message, setMessage] = useState({ show: false, status: "" });
  const { products, setProducts } = useContext(productContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNewProduct(initialValues);

    await createProduct(newProduct).then((res) => {
      setMessage({ show: true, status: res.status });
      setTimeout(() => {
        setMessage({ show: false, status: "" });
      }, 5000);

      setProducts((prev) => [...prev, res.newProduct]);
    });
  };

  return (
    <section>
      <h4>Formulario</h4>
      <form
        onSubmit={handleSubmit}
      >
        {message.show && (
          <p>
            {message.status}
          </p>
        )}
        <div>
          <label htmlFor="name">
            nombre
          </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={newProduct.name}
          />
        </div>
        <div>
          <label htmlFor="description">
            descripción
          </label>
          <input
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
            value={newProduct.description}
          />
        </div>
        <div>
          <label htmlFor="price">
            precio
          </label>
          <input
            type="text"
            name="price"
            id="price"
            onChange={handleChange}
            value={newProduct.price}
          />
        </div>
        <div>
          <label htmlFor="stock">
            stock
          </label>
          <input
            type="text"
            name="stock"
            id="stock"
            onChange={handleChange}
            value={newProduct.stock}
          />
        </div>
        <div>
          <label htmlFor="prodId">
            id de producto
          </label>
          <input
            type="text"
            name="prodId"
            id="prodId"
            onChange={handleChange}
            value={newProduct.prodId}
          />
        </div>
        <div>
          <label htmlFor="thumbnail">
            foto
          </label>
          <input
            type="text"
            name="thumbnail"
            id="thumbnail"
            onChange={handleChange}
            value={newProduct.thumbnail}
          />
        </div>
        <button>
          Crear producto
        </button>
      </form>
    </section>
  );
}

export default Form();