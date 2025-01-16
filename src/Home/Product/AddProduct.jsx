// src/AddProduct.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
// import { useHistory } from 'react-router-dom';

const AddProduct = ({ addProduct }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQA, setProductQA] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productName && productPrice && productQA && productCategory) {
      addProduct({ 
        id: Date.now(), 
        name: productName, 
        price: productPrice, 
        QA: productQA,
        category: productCategory 
      });
      // Reset fields
      setProductName('');
      setProductPrice('');
      setProductQA('');
      setProductCategory('');
      setErrorMessage(''); // Reset error message
      history.push('/'); // Redirect to the product list after adding
    } else {
      setErrorMessage('Please fill in all fields.'); // Set error message if fields are empty
    }
  };

  return (
    <div className="main-container mt-5">
      <h1 className="text-center mb-4">Add New Product</h1>
      <Card className="shadow-lg" style={{ backgroundColor: '#f8f9fa' }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="formProductName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter product name" 
                    value={productName} 
                    onChange={(e) => setProductName(e.target.value)} 
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group controlId="formProductPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter price" 
                    value={productPrice} 
                    onChange={(e) => setProductPrice(e.target.value)} 
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group controlId="formProductQA">
                  <Form.Label>QA</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter QA" 
                    value={productQA} 
                    onChange={(e) => setProductQA(e.target.value)} 
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group controlId="formProductCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter category" 
                    value={productCategory} 
                    onChange={(e) => setProductCategory(e.target.value)} 
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {errorMessage && (
              <p style={{ color: 'red' }}>{errorMessage}</p> // Display error message if any
            )}

            <Button variant="primary" type="submit" className="w-100">Add Product</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddProduct;
