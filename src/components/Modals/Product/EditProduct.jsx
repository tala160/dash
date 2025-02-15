import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaTrashAlt, FaUpload } from "react-icons/fa";
import { validateProduct } from "./validation";

const EditProductModal = ({
  show,
  handleClose,
  handleSaveProduct,
  categories = [],
  product: initialProduct,
}) => {
  const [product, setProduct] = useState({
    id: null,
    name: "",
    price: 0,
    categoryId: null,
    categoryName: "",
    images: [],
  });
  const [error, setError] = useState(null);
  const [images, setImages] = useState(null);
  
  // to update product
  useEffect(() => {
    if (initialProduct) {
      setProduct({
        ...initialProduct,
        price: parseFloat(initialProduct.price),
        categoryId: parseInt(initialProduct.categoryId, 10),
        categoryName:
          categories.find((cat) => cat.id === parseInt(initialProduct.categoryId, 10))?.name || "",
      });
    }
  }, [initialProduct, categories]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
      ...(name === "categoryId" && {
        categoryId: parseInt(value, 10),
        categoryName: categories.find((cat) => cat.id === parseInt(value, 10))?.name || "",
      }),
    }));
  };


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      alert("You can only upload up to 4 images.");
      return;
    }
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };


  const handleRemoveImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();


    const productToSend = {
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      images: product.images,
    };

    if (!validateProduct(productToSend)) {
      return;
    }

    handleSaveProduct(productToSend);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formProductName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProductPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProductCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="categoryId"
              value={product.categoryId || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
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

            {product.images.map((image, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <span className="me-2">{image instanceof File ? image.name : image}</span>
                <Button variant="danger" size="sm" onClick={() => handleRemoveImage(index)}>
                  <FaTrashAlt />
                </Button>
              </div>
            ))}
          </div>

          {/* Save Button */}
          <Button variant="primary" type="submit" className="w-100" style={{ backgroundColor: "black", border: "none" }}>
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

EditProductModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSaveProduct: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    categoryId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.oneOf([null]) 
    ]).isRequired,
    images: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)])),
  }).isRequired,
};

export default EditProductModal;
