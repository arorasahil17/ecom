import "./createProduct.css";
import { useState } from "react";
import axios from "axios";

const Createproduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    console.log("image", e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to store the form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", image);
    console.log(image);

    try {
      // Send the form data to the backend API using axios
      const response = await axios.post(
        "http://localhost:8080/products",
        formData
      );

      if (response.status === 200) {
        // Handle successful response
        console.log("Product saved successfully");
      } else {
        // Handle error response
        console.error("Error saving product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <>
      <div className="row justify-content-center mt-5">
        <form className="form" onSubmit={handleSubmit}>
          <p className="form-title">Add New Product</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={handleNameChange}
            />
            <span></span>
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter Price"
              value={price}
              onChange={handlePriceChange}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter Category"
              value={category}
              onChange={handleCategoryChange}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="input-container">
            <input type="file" onChange={handleImageChange} />
          </div>
          <button type="submit" className="submit">
            Upload
          </button>
        </form>
      </div>
    </>
  );
};

export default Createproduct;
