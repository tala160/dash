import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaTrashAlt, FaUpload } from "react-icons/fa";

const ProductModal = ({
  show,
  isEdit,
  product,
  handleChange,
  handleCloseModal,
  handleSaveProduct,
}) => {
  
  ProductModal.propTypes = {
    show: PropTypes.bool.isRequired,
    isEdit: PropTypes.bool.isRequired,
    product: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      title: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      qa: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    handleSaveProduct: PropTypes.func.isRequired,
  };

 
  const categories = [
    "Electronics",
    "Clothing",
    "Furniture",
    "Books",
    "Toys",
    "Beauty",
    
  ];

  return (
    <>
      {/* Modal for Add/Edit */}
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveProduct}>
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
                <option value="">Select a category</option> {/* Placeholder option */}
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {isEdit ? "Save Changes" : "Add Product"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

ProductModal.propTypes = {
  show: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    qa: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleSaveProduct: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

export default ProductModal;
