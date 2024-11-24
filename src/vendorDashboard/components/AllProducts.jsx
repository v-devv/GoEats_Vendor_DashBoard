import React, { useState, useEffect } from "react";
import { API_URL } from "../data/ApiPath";
import './AllProducts.css'

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const productHandler = async () => {
    const franchiseId = localStorage.getItem("franchiseId");
    try {
      const response = await fetch(`${API_URL}/product/${franchiseId}/products`);
      const newProductsData = await response.json();
      setProducts(newProductsData.products);
      console.log(newProductsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    productHandler();
    console.log("this is useeffect");
  }, []);

  const deleteProductById = async(productId)=>{
    try {
        const response = await fetch(` ${API_URL}/product/product/${productId}` , {
            method: 'DELETE',
        })
        console.log(" response",response)
        if(response.ok){
            console.log('Product deleted successfully')
            setProducts(products.filter(product => product._id !== productId))
            confirm(" are you sure  , you want to delete?")
        }
    } catch (error) {
        console.error(error , "Failed to delete froduct");
        alert("Failed to delete froduct")

    }
  }

  return (
    <div className="all-products-container">
      <h1 className="products-title">All Products</h1>
      {!products ? (
        <h3 className="no-products-message">No products added</h3>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
                
              <tr key={product._id}>
                <td>{product.productName}</td>
                <td>{product.productPrice}</td>
                <td>
                  {product.productImage && (
                    <img
                      src={`${API_URL}/uploads/${product.productImage}`}
                      alt={product.productName}
                      style={{width : '50', height : '50px'}}
                      className="product-image"
                      
                    />
                  )}
                </td>
                <td>
                  <button onClick={()=>deleteProductById(product._id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;
