// AddProductModal.js

import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaUpload } from "react-icons/fa";
import { validateProduct } from "./validation";

const AddProductModal = ({
  show,
  handleCloseModal,
  handleSaveProduct,
  categories = [],
}) => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    qa: "",
    category: "",
    images: [],
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      alert("You can only upload up to 4 images.");
      return;
    }
    const newImages = files.map((file) => file.name); // Store the file names
    setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the product before saving
    if (!validateProduct(product)) {
      return;
    }
    handleSaveProduct({ ...product, images }); // Pass token here
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formProductName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProductPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProductQA">
            <Form.Label>QA</Form.Label>
            <Form.Control
              type="text"
              name="qa"
              value={product.qa}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProductCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Image Upload Section */}
          <div className="mb-4">
            <h5>Upload Images</h5>
            <input
              type="file"
              id="uploadImages"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="uploadImages" className="btn btn-secondary mb-2">
              <FaUpload /> Upload Images
            </label>

            {images.map((image, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <span className="me-2">{image}</span>
              </div>
            ))}
          </div>

          {/* Save Button */}
          <Button variant="primary" type="submit" className="w-100">
            Add Product
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

AddProductModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleSaveProduct: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  token: PropTypes.string,
};

export default AddProductModal;
