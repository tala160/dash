import React, { useState, useMemo, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Form, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from 'react-icons/fa';
// import EditCategory from "../../components/Modals/CategoryModal";
import EditCategory from "../../components/Modals/Category/EditCategory";
import AddNEWCategory from "../../components/Modals/Category/AddCategory";
import DeleteModal from "../../components/Modals/DeleteModal";
import Pagination from "../../components/Pagination";
import { GetAllCategories, AddCategory, UpdateCategory, DeleteCategory } from "../../api/Categories.api";
import {  readUser } from '../../services/localStorage.service';
import { showSuccessNotification, showErrorNotification } from '../../services/NotificationService';
import { Toaster } from 'react-hot-toast';

const CategoryList = () => {

    const [categories, setCategories] = useState([]);    
    const [isAdd, setIsAdd] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ id: null, name: "", image: "" });
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 5;

    const [token, setToken] = useState(null);

    // readToken of localStorage
    useEffect(() => {
        const storedToken = readUser(); 
        console.log("Fetched token from local storage:", storedToken);
        setToken(storedToken.token);
        
    }, []);

    //go to the first page
    useEffect(() => {
    setCurrentPage(1);
    }, [searchQuery]);

    const handleClose = () => {
        setShowModal(false);
        setIsEdit(false);
        setIsAdd(false);
        setIsDelete(false);
        setCurrentCategory({ id: null, name: "", image: "" });
    };

    const handleShow = () => {
        setShowModal(true);
        setIsAdd(true); 
        setIsEdit(false);
    };

    const handleEdit = (category,storedToken) => {
        setCurrentCategory(category);
        setToken(storedToken)
        setIsEdit(true);
        setIsAdd(false); 
        setShowModal(true);
    };

    const handleDelete = async (categoryToDelete,storedToken) => {
        setCurrentCategory(category);
        setToken(storedToken)
        setIsDelete(true);
        setShowModal(true);
        try {
            await DeleteCategory(categoryToDelete.id);
            setCategories(categories.filter((category) => category.id !== categoryToDelete.id));
        } catch (err) {
            console.error("Error deleting category:", err.message);
        }

        setCategories(categories.filter((category) => category.id !== categoryToDelete.id));
       
    };

    const handleConfirmDelete = async () => {
        try {
            await DeleteCategory(currentCategory.id , token);
            setCategories(categories.filter((category) => category.id !== currentCategory.id));
            showSuccessNotification("Category deleted successfully!");
            handleClose();
        } catch (err) {
            // console.error("Error deleting category:", err.message);
            showErrorNotification("Failed to delete category.");
        }
    };

    const handleSaveCategory = async (newCategory,token) => {
        try {
            const categoryData = { name: newCategory};
           console.log(token)
            if (!token) {
                console.error("Authentication token is missing.");
                return;
            }
            if (isEdit) {
                await UpdateCategory(currentCategory.id, categoryData, token); 
                const updatedCategories = categories.map((cat) =>
                    cat.id === currentCategory.id ? { ...cat, name: newCategory } : cat
                );
                setCategories(updatedCategories);
                showSuccessNotification("Category updated successfully!");
            } else {
                const response = await AddCategory(categoryData, token); 
                if (response.status === 201 || response.status === 200) { 
                    setCategories([...categories, response.data]);
                    showSuccessNotification("Category added successfully!");
                } else {
                    throw new Error('Failed to add category');
                }

                
            }
           
    
            handleClose();
            showSuccessNotification("Category saved successfully!");
        } catch (err) {
            // console.error("Error saving category:", err.message);
            showErrorNotification("Failed to save category.");
        }
    };
    

    
    
    // Filter categories based on search query
    const filteredCategories = useMemo(() => {
        return categories.filter(category =>
            category.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [categories, searchQuery]);

    const currentCategories = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredCategories.slice(start, start + itemsPerPage);
    }, [currentPage, filteredCategories]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await GetAllCategories();
                setCategories(response.data);
            } catch (err) {
                console.error("Error fetching categories:", err.message);
            }

        };

        fetchCategories();
    }, []);

    return (
        <div className="my-5 main-container">
            <Toaster position="top-right" reverseOrder={false} />
            <Row>
                <Col md={12}>
                    <h1 className="text-center mb-4">Category List</h1>
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
                            <Button onClick={handleShow} className="w-100" style={{ backgroundColor: "#a1dee5d1", border: "none" }}>
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
                                    {currentCategories.map((category) => (
                                        <tr key={category.id}>
                                            <td>{category.name}</td>
                                            <td>
                                                {category.image && (
                                                    <img src={category.image} alt={category.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} />
                                                )}
                                            </td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEdit(category)}
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

                    {filteredCategories.length > itemsPerPage && (
                        <Pagination
                            totalItems={filteredCategories.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    )}

                    {/* <EditCategory
                        show={showModal}
                        handleClose={handleClose}
                        handleSaveCategory={handleSaveCategory}
                        currentCategory={currentCategory}
                        isEdit={isEdit}
                        categories={categories}
                        token={token}
                    /> */}
                        <EditCategory
                        show={showModal && isEdit}
                        handleClose={handleClose}
                        handleSaveCategory={handleSaveCategory}
                        currentCategory={currentCategory}
                        isEdit={isEdit}
                        token={token}
                            />
                        <AddNEWCategory
                        show={showModal && !isEdit}
                        handleClose={handleClose}
                        handleSaveCategory={handleSaveCategory}
                        token={token}
                         />
                         <DeleteModal
                        show={showModal && isDelete}
                        handleCloseModal={handleClose}
                        handleDelete={handleConfirmDelete}
                        itemName="category"
                        token={token}
                         />
                </Col>
            </Row>
        </div>
    );
};

export default CategoryList;
