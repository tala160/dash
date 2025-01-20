import React, { useState, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Container, Row, Col, Table } from 'react-bootstrap';
import OrderModal from '../../components/Modals/OrderModal'; 
import Pagination from '../../components/Pagination'; 
import { FaEdit } from 'react-icons/fa'; 

const OrderList = () => {
  const [orders, setOrders] = useState([
    { id: 1, name: 'Order 1', total: '$100', quantity: 5, customer: 'John Doe', status: 'Pending', date: '2025-01-15' },
    { id: 2, name: 'Order 2', total: '$200', quantity: 3, customer: 'Jane Smith', status: 'Completed', date: '2025-01-14' },
    { id: 3, name: 'Order 3', total: '$150', quantity: 2, customer: 'Alice Johnson', status: 'Pending', date: '2025-01-13' },
    { id: 1, name: 'Order 1', total: '$100', quantity: 5, customer: 'John Doe', status: 'Pending', date: '2025-01-15' },
    { id: 2, name: 'Order 2', total: '$200', quantity: 3, customer: 'Jane Smith', status: 'Completed', date: '2025-01-14' },
    { id: 3, name: 'Order 3', total: '$150', quantity: 2, customer: 'Alice Johnson', status: 'Pending', date: '2025-01-13' },
    
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({ id: null, total: '', status: '' });
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const handleClose = () => {
    setShowModal(false);
    setCurrentOrder({ id: null, total: '', status: '' });
  };

  const handleShow = (order) => {
    setCurrentOrder(order);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentOrder({ ...currentOrder, [name]: value });
  };

  const handleSaveChanges = () => {
    setOrders(orders.map(order => 
      order.id === currentOrder.id ? currentOrder : order
    ));
    handleClose();
  };

  // Filter orders based on search query
  const filteredOrders = orders.filter(order =>
    order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Current orders for display
  const currentOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage); // Return filtered orders for current page
  }, [currentPage, filteredOrders]);

  return (
    <Container className="my-5 main-container">
      <Row className="justify-content-center">
        <Col md={12}>
          <h2 className="text-center mb-4">Order List</h2>

          {/* Search input field */}
          <Form.Group controlId="search" className="mb-3">
            <Form.Control 
              type="text" 
              placeholder="Search by order name or customer name" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </Form.Group>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Order Name</th>
                <th>Total Price</th>
                <th>Quantity</th>
                <th>Customer Name</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.name}</td>
                    <td>{order.total}</td>
                    <td>{order.quantity}</td>
                    <td>{order.customer}</td>
                    <td>{order.status}</td>
                    <td>{order.date}</td>
                    <td>
                      <Button variant="warning" onClick={() => handleShow(order)}> <FaEdit /></Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="7" className="text-center">No orders found matching your search.</td></tr> // Message when no orders are found
              )}
            </tbody>
          </Table>

          {/* Pagination */}
          {filteredOrders.length > itemsPerPage && (
            <Pagination
              totalItems={filteredOrders.length} // Use the number of filtered items
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}

          {/* Modal for editing an order */}
          <OrderModal
            show={showModal}
            handleClose={handleClose}
            handleSaveChanges={handleSaveChanges}
            currentOrder={currentOrder}
            handleChange={handleChange}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default OrderList;
