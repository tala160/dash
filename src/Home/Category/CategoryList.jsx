import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Modal, Container, Row, Col } from 'react-bootstrap';

const CategoryList = () => {
  const [categories, setCategories] = useState([
    'Clothes',
    'Electronics',
    'Furniture'
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const handleDelete = (categoryToDelete) => {
    setCategories(categories.filter(category => category !== categoryToDelete));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCategory) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
      handleClose();
    }
  };

  return (
    <Container className="my-5 main-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">قائمة الفئات</h2>
          <Button variant="primary" onClick={handleShow} className="mb-3 w-100">إضافة فئة جديدة</Button>
          <ul className="list-group">
            {categories.map((category, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {category}
                <Button variant="danger" size="sm" onClick={() => handleDelete(category)}>حذف</Button>
              </li>
            ))}
          </ul>

          {/* Modal for adding a new category */}
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>إضافة فئة جديدة</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNewCategory">
                  <Form.Label>اسم الفئة</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="أدخل اسم الفئة" 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)} 
                    required 
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3 w-100">إضافة</Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryList;
