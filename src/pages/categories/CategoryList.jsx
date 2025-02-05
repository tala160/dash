import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col, Form, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import EditCategory from "../../components/Modals/CategoryModal";
import Pagination from "../../components/Pagination";

const CategoryList = () => {
  const [categories, setCategories] = useState([
    "Clothes",
    "Electronics",
    "Furniture",
    "Books",
    "Shoes",
    "Toys",
    "Sports",
    "Beauty",
    "Home",
    "Garden",
    "Automotive",
    "Jewelry",
    "Groceries",
    "Pet Supplies",
    "Office",
    "Tools",
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 5;

  const handleClose = () => {
    setShowModal(false);
    setIsEdit(false);
    setCurrentCategory("");
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const handleEdit = (category, index) => {
    setCurrentCategory(category);
    setIsEdit(true);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (categoryToDelete) => {
    setCategories(categories.filter((category) => category !== categoryToDelete));
  };

  const handleSaveCategory = (newCategory) => {
    if (isEdit) {
      const updatedCategories = [...categories];
      updatedCategories[editIndex] = newCategory;
      setCategories(updatedCategories);
    } else {
      setCategories([...categories, newCategory]);
    }
    handleClose();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter categories based on search query
  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Current categories for display
  const currentCategories = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCategories.slice(start, start + itemsPerPage);
  }, [currentPage, filteredCategories]);

  return (
    <div className="my-5 main-container">
      <Row className="">
        <Col md={12}>
          <h2 className="text-center mb-4">Category List</h2>
          
          {/* Search input field and Add button in one row */}
          <Row className="mb-3">
            <Col md={8}>
              <Form.Group controlId="search" className="mb-0">
                <Form.Control 
                  type="text" 
                  placeholder="Search by category name" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Button onClick={handleShow} className="w-100" style={{backgroundColor: "#a1dee5d1" , border: "none"}}>
                Add New Category
              </Button>
            </Col>
          </Row>

          {currentCategories.length > 0 ? (
            <div className="table-responsive">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Category Name</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCategories.map((category, index) => (
                    <tr key={index}>
                      <td>{category}</td>
                      <td>
                        {category.image && (
                          <img src={category.image} alt={category.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                        )}
                      </td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(category, index)}
                        >
                          <FaEdit /> 
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(category)}
                        >
                          <FaTrash /> 
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <p className="text-center">No categories found matching your search.</p> 
          )}

          {/* Pagination */}
          {filteredCategories.length > itemsPerPage && (
            <Pagination
              totalItems={filteredCategories.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}

          {/* Modal for adding/editing a category */}
          <EditCategory
            show={showModal}
            handleClose={handleClose}
            handleSaveCategory={handleSaveCategory}
            currentCategory={currentCategory}
            isEdit={isEdit}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CategoryList;
