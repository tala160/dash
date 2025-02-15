import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";

const EditCategory = ({
  show,
  handleClose,
  handleSaveCategory,
  currentCategory,
   
}) => {
  const [category, setCategory] = useState(currentCategory.name);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setCategory(currentCategory.name);
    setImage(null); // Clear the image field initially
    setError(null); // Clear any previous errors
  }, [currentCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category) {
      setError("Category Name is required");
      return;
    }

    setError(null); // Clear any previous errors

    const formData = new FormData();
    formData.append("name", category);

    if (image) {
      formData.append("image", image); // Append the new image if selected
    }

    handleSaveCategory(formData);
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
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
            <Form.Label>Category Image (Optional)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3 w-100" style={{ backgroundColor: "black", border: "none" }}>
            Save Changes
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
  currentCategory: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  //  isEdit: PropTypes.bool.isRequired,
};

export default EditCategory;
