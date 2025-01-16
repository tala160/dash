import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Modal, Container, Row, Col, Table } from 'react-bootstrap';

const OrderList = () => {
  const [orders, setOrders] = useState([
    { id: 1, name: 'Order 1', total: '$100', quantity: 5, customer: 'John Doe', status: 'Pending', date: '2025-01-15' },
    { id: 2, name: 'Order 2', total: '$200', quantity: 3, customer: 'Jane Smith', status: 'Completed', date: '2025-01-14' },
    { id: 3, name: 'Order 3', total: '$150', quantity: 2, customer: 'Alice Johnson', status: 'Pending', date: '2025-01-13' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({ id: null, total: '', status: '' });

  const handleClose = () => {
    setShowModal(false);
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

  return (
    <Container className="my-5 main-container">
      <Row className="justify-content-center">
        <Col md={10}>
          <h2 className="text-center mb-4">قائمة الطلبات</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>اسم الطلب</th>
                <th>السعر الكلي</th>
                <th>عدد القطع</th>
                <th>اسم الزبون</th>
                <th>حاله الطلب</th>
                <th>تاريخ الطلب</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.name}</td>
                  <td>{order.total}</td>
                  <td>{order.quantity}</td>
                  <td>{order.customer}</td>
                  <td>{order.status}</td>
                  <td>{order.date}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleShow(order)}>تعديل</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Modal for editing an order */}
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>تعديل الطلب</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formOrderTotal">
                  <Form.Label>السعر الكلي</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="أدخل السعر الكلي" 
                    name="total" 
                    value={currentOrder.total} 
                    onChange={handleChange} 
                  />
                </Form.Group>

                <Form.Group controlId="formOrderStatus">
                  <Form.Label>حاله الطلب</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="أدخل حاله الطلب" 
                    name="status" 
                    value={currentOrder.status} 
                    onChange={handleChange} 
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                إلغاء
              </Button>
              <Button variant="primary" onClick={handleSaveChanges}>
                حفظ التغييرات
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderList;
