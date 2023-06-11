import React, { useState, useEffect } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const [updateProduct, setUpdateProduct] = useState("");
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

  // Fetch listing data from the dummy URL
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

  // Add a new product to the list
  const addProduct = () => {
    setProducts((prevProducts) => {
      if (Array.isArray(prevProducts)) {
        return [...prevProducts, newProduct];
      }
      return [newProduct];
    });
    setNewProduct("");
  };

  // Update an existing product in the list
  const updateProductData = () => {
    if (selectedProductIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[selectedProductIndex] = updateProduct;
      setProducts(updatedProducts);
      setUpdateProduct("");
      setSelectedProductIndex(null);
    }
  };

  // Delete a product from the list
  const deleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <div>
      <h1>Product List</h1>
      {Array.isArray(products) && products.length > 0 ? (
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              {product}
              <button onClick={() => deleteProduct(index)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available</p>
      )}

      <h2>Add Product</h2>
      <input
        type="text"
        value={newProduct}
        onChange={(e) => setNewProduct(e.target.value)}
      />
      <button onClick={addProduct}>Add</button>

      <h2>Update Product</h2>
      {selectedProductIndex !== null ? (
        <>
          <input
            type="text"
            value={updateProduct}
            onChange={(e) => setUpdateProduct(e.target.value)}
          />
          <button onClick={updateProductData}>Update</button>
        </>
      ) : (
        <p>No product selected for update</p>
      )}
      {Array.isArray(products) && products.length > 0 && (
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              {product}
              <button onClick={() => setSelectedProductIndex(index)}>
                Select for Update
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
