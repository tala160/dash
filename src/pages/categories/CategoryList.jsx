import React, { useState, useMemo, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Form, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditCategory from "../../components/Modals/CategoryModal";
import Pagination from "../../components/Pagination";
import { GetAllCategories, AddCategory, UpdateCategory, DeleteCategory } from "../../api/Categories.api";


const CategoryList = () => {

    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ id: null, name: "", image: "" });
    const [isEdit, setIsEdit] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 5;

   

    const handleClose = () => {
        setShowModal(false);
        setIsEdit(false);
        setCurrentCategory({ id: null, name: "", image: "" });
    };

    const handleShow = () => {
        setShowModal(true);
    };

    const handleEdit = (category) => {
        setCurrentCategory(category);
        setIsEdit(true);
        setShowModal(true);
    };

    const handleDelete = async (categoryToDelete) => {
        try {
            await DeleteCategory(categoryToDelete.id);
            setCategories(categories.filter((category) => category.id !== categoryToDelete.id));
        } catch (err) {
            console.error("Error deleting category:", err.message);
        }
        // setCategories(categories.filter((category) => category.id !== categoryToDelete.id));
    };

    const handleSaveCategory = async (newCategory, newImage) => {
        try {
            const categoryData = { name: newCategory, image: newImage };
            if (isEdit) {
                await UpdateCategory(currentCategory.id, categoryData);
                const updatedCategories = categories.map((cat) =>
                    cat.id === currentCategory.id ? { ...cat, name: newCategory, image: newImage } : cat
                );
                setCategories(updatedCategories);
            } else {
                const response = await AddCategory(categoryData);
                setCategories([...categories, response.data]); 
            }
            handleClose();
        } catch (err) {
            console.error("Error saving category:", err.message);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);
    
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
            // const fakeData = generateFakeData();
            // setCategories(fakeData);
        };

        fetchCategories();
    }, []);

    return (
        <div className="my-5 main-container">
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
                                                    <img src={category.image} alt={category.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
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

                    <EditCategory
                        show={showModal}
                        handleClose={handleClose}
                        handleSaveCategory={handleSaveCategory}
                        currentCategory={currentCategory}
                        isEdit={isEdit}
                        categories={categories}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default CategoryList;
