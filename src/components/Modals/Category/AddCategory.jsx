import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";

const AddCategory = ({ show, handleClose, handleSaveCategory }) => {

  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCategory("");
     // Clear the category name  & image  when the modal opens
     setImage(null);
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (category && image) {
      const formData = new FormData();
      formData.append("name", category);
      formData.append("image", image);

      handleSaveCategory(formData);
      setCategory(""); 
      setImage(null); 
      handleClose(); 
    } else {
      setError("Both fields are required");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCategoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCategoryImage">
            <Form.Label>Category Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3 w-100" style={{ backgroundColor: "black", border: "none" }}>
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

AddCategory.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSaveCategory: PropTypes.func.isRequired,
};

export default AddCategory;
