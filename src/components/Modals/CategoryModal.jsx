import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";

const EditCategory = ({
  show,
  handleClose,
  handleSaveCategory,
  currentCategory,
  isEdit,
}) => {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(currentCategory.name);
  const [error, setError] = useState(null); // State to display error message

  useEffect(() => {
    setCategory(currentCategory.name);
    // setImage(null);
  }, [currentCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category) {
      handleSaveCategory(category);
    }
  };
  // const handleImageChange = (e) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //         const reader = new FileReader();
  //         reader.onloadend = () => {
  //             setImage(reader.result);
  //         };
  //         reader.readAsDataURL(file);
  //     }
  // };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEdit ? "Edit Category" : "Add New Category"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}{" "}
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
          {/* <Form.Group controlId="formCategoryImage" className="mt-3">
                        <Form.Label>Category Image</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Form.Group> */}
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
  currentCategory: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  isEdit: PropTypes.bool.isRequired,
};
export default EditCategory;
