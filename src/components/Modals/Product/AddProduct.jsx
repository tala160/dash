import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";


const AddProduct = ({
  show,
  handleClose,
  handleSaveProduct,
  categories = [],
}) => {
  const [images, setImages] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      alert("You can only upload up to 4 images.");
      return;
    }
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && images.length > 0 && price && categoryId) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", parseFloat(price));
      formData.append("categoryId", parseInt(categoryId));
      // formData.append("categoryId", categoryId); 
      
      images.forEach((image, index) => {
        formData.append(`images`, image);
      });
      // Log FormData contents
      console.log("FormData Contents:");
      for (let pair of formData.entries()) {
          console.log(pair[0]+ ', ' + pair[1]);
      }


      handleSaveProduct(formData);
      setName("");
      setPrice("");
      setCategoryId("");
      setImages([]);
      handleClose();
    } else {
      alert("All fields are required");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formProductName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProductPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProductCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                 {category.id} {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Image Upload Section */}
          <Form.Group controlId="formProductImages">
            <Form.Label>Product Images (Max 4)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              required
            />
          </Form.Group>

          {/* Display selected image names */}
          {images.length > 0 && (
            <div className="mt-2">
              <strong>Selected Images:</strong>
              <ul>
                {images.map((image, index) => (
                  <li key={index}>{image.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Add Product Button */}
          <Button variant="primary" type="submit" className="w-100 mt-3" style={{ backgroundColor: "black", border: "none" }}>
            Add Product
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

AddProduct.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSaveProduct: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

export default AddProduct;
