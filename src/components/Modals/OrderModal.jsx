import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const OrderModal = ({ show, handleClose, handleSaveChanges, currentOrder, handleChange, originalOrder }) => {
  const isChanged = currentOrder.total !== originalOrder?.total || currentOrder.status !== originalOrder?.status;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formOrderTotal">
            <Form.Label>Total Price</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter total price" 
              name="total" 
              value={currentOrder.total} 
              onChange={handleChange} 
            />
          </Form.Group>

          <Form.Group controlId="formOrderStatus">
            <Form.Label>Order Status</Form.Label>
            <Form.Select 
              name="status" 
              value={currentOrder.status} 
              onChange={handleChange}
            >
              <option value="">Select order status</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveChanges} disabled={!isChanged} style={{ backgroundColor: "black", border: "none" }}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;
