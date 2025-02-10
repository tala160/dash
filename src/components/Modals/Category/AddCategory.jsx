import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";

const AddCategory = ({ show, handleClose, handleSaveCategory, token }) => {
    const [category, setCategory] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        setCategory(""); // Clear the category name when the modal opens
    }, [show]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            setError("Authentication token is missing.");
            return;
        }
        if (category) {
            handleSaveCategory(category, token);
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
                    <Button variant="primary" type="submit" className="mt-3 w-100">
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
    token: PropTypes.string,
};

export default AddCategory;
