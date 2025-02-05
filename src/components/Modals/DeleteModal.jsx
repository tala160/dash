import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

const DeleteModal = ({ show, handleCloseModal, handleDelete }) => {
  return (
    <>
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this product?</p>
          <Button onClick={handleDelete} variant="danger" className="w-100">
            Yes, Delete
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteModal;

DeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
