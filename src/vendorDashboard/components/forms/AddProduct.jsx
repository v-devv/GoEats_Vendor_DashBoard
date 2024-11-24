import React, { useState } from "react";
import { API_URL } from "../../data/ApiPath";
const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productCategory, setProductCategory] = useState([]);
  const [bestseller, setBestseller] = useState(true);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (productCategory.includes(value)) {
      setProductCategory(productCategory.filter((item) => item !== value));
    } else {
      setProductCategory([...productCategory, value]);
    }
  };

  const handleBestsellerChange = (event) => {
    const value = event.target.value === "true"; 
    setBestseller(value);
    console.log(value)
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      const franchiseId = localStorage.getItem("franchiseId");
      if (loginToken || franchiseId) {
        console.error("user not authenticated");
      }
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("productPrice", productPrice);
      formData.append("productDescription", productDescription);
      formData.append("productImage", productImage);
      formData.append("bestSeller", bestseller);
      productCategory.forEach((value) => {
        formData.append("productCategory", value);
      });
      const response = await fetch(
        `${API_URL}/product/add-product/${franchiseId}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert("Add product succefully");
      }
      setProductName("");
      setProductPrice("");
      setProductDescription("");
      setProductImage(null);
      setProductCategory([]);
      setBestseller(true);
    } catch (error) {
      console.error(data.message);
      alert("Failed to add product ");
    }
  };
  return (
    <div className="addProductSection">
      <form className="addProductForm" onSubmit={handleAddProduct}>
        <h2 className="addProductTitle">Add Product</h2>

        <div className="formGroup">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>

        <div className="formGroup">
          <label>Category</label>
          <div className="checkboxGroup">
            <label className="checkboxLabel">
              <input
                type="checkbox"
                value="veg"
                checked={productCategory.includes("veg")}
                onChange={handleCategoryChange}
              />
              <span className="customCheckbox"></span>
              Veg
            </label>
            <label className="checkboxLabel">
              <input
                type="checkbox"
                value="non-veg"
                checked={productCategory.includes("non-veg")}
                onChange={handleCategoryChange}
              />
              <span className="customCheckbox"></span>
              Non-Veg
            </label>
          </div>
        </div>

        <div className="formGroup">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => setProductImage(e.target.files[0])}
            required
          />
        </div>

        <div className="formGroup">
          <label>Bestseller</label>
          <div className="radioGroup">
            <label>
              <input
                type="radio"
                name="bestseller"
                value="true"
                checked={bestseller === true}
                onChange={handleBestsellerChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="bestseller"
                value="false"
                checked={bestseller === false}
                onChange={handleBestsellerChange}
              />
              No
            </label>
          </div>
        </div>

        <div className="formGroup">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter product description"
            rows="4"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="addProductButton">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
