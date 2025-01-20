import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";

const EditCategory = ({ show, handleClose, handleSaveCategory, currentCategory, isEdit }) => {
  const [category, setCategory] = useState(currentCategory);

  useEffect(() => {
    setCategory(currentCategory);
  }, [currentCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category) {
      handleSaveCategory(category);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "Edit Category" : "Add New Category"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          <Button variant="primary" type="submit" className="mt-3 w-100">
            {isEdit ? "Save Changes" : "Add"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

EditCategory.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSaveCategory: PropTypes.func.isRequired,
  currentCategory: PropTypes.string.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default EditCategory;
