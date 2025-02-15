import { useState, useMemo, useEffect } from "react";
import { Button, Row, Col, Form, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

import EditCategory from "../../components/Modals/Category/EditCategory";
import AddNEWCategory from "../../components/Modals/Category/AddCategory";
import DeleteModal from "../../components/Modals/DeleteModal";

import Pagination from "../../components/Uitily/Pagination";
import {GetAllCategories, AddCategory,DeleteCategory,UpdateCategory,} from "../../api/categories.api";
import { showSuccessNotification, showErrorNotification,} from "../../services/NotificationService";
import { Toaster } from "react-hot-toast";

const CategoryList = () => {

  const [categories, setCategories] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({id: null,  name: "",  image: "", });// Stores the category being edited/delet
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  //Closes the modal and resets the state variables
  const handleClose = () => {
    setShowModal(false);
    setIsEdit(false);
    setIsAdd(false);
    setIsDelete(false);
    setCurrentCategory({ id: null, name: "", image: "" });
  };
  //Shows the modal for adding a new category
  const handleShow = () => {
    setShowModal(true);
    setIsAdd(true);
    setIsEdit(false);
  };
  //Shows the modal for editing an existing category
  const handleEdit = (category) => {
    setCurrentCategory(category);
    setIsEdit(true);
    setIsAdd(false);
    setShowModal(true);
  };

  // ---------------------------------------------DELETE----------------------------------------------------
  //Shows the modal for deleting an existing category
  const handleDelete = async (categoryToDelete) => {
    
    setCurrentCategory(categoryToDelete); // Store the category to delete
    setIsDelete(true);
    setShowModal(true);

  };

  //Confirms the deletion of a category
  const handleConfirmDelete = async () => {
    try {
      await DeleteCategory(currentCategory.id);
      setCategories(
        categories.filter((category) => category.id !== currentCategory.id)
      );
      showSuccessNotification("Category deleted successfully!");
      handleClose();
    } catch (err) {
      showErrorNotification("Failed to delete category.", err);
    }
  };
//-------------------------------------ADD & EDIT ------------------------------------------
  //Saves a new or edited category
  const handleSaveCategory = async (categoryData) => {
    try {
      if (isEdit) {
        const formData = new FormData();
        formData.append("name", categoryData.get("name")); // Use get to access FormData values
        if (categoryData.get("image")) {
          formData.append("image", categoryData.get("image"));
        }

        await UpdateCategory(currentCategory.id, formData);

        // after update
        const updatedCategories = categories.map((cat) =>
          cat.id === currentCategory.id
            ? { ...cat, name: categoryData.get("name"), image: categoryData.get("image") ? URL.createObjectURL(categoryData.get("image")) : cat.image }
            : cat
        );
        setCategories(updatedCategories);

        showSuccessNotification("Category updated successfully!");
      } else {
        const response = await AddCategory(categoryData);
        if (response.status === 201 || response.status === 200) {
          setCategories([...categories, response.data]);
        
        } else {
          throw new Error("Failed to add category");
        }
      }

      handleClose();
      showSuccessNotification("Category saved successfully!");
    } catch (err) {
      showErrorNotification("Failed to save category.", err);
    }
  };
  
// --------------------------------------------search-----------------------------------------------------

  const itemsPerPage = 5;

//go to the first page
useEffect(() => {
  setCurrentPage(1);
}, [searchQuery]);

  // Filter categories based on search query
  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  const currentCategories = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCategories.slice(start, start + itemsPerPage);
  }, [currentPage, filteredCategories]);
// ---------------------------------------------fetch----------------------------------------------------
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
              <Button
                onClick={handleShow}
                className="w-100"
                style={{ backgroundColor: "black", border: "none" }}
              >
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
                          <img
                            src={category.image}
                            alt={category.name}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "5px",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            }}
                          />
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
            <p className="text-center">
              No categories found matching your search.
            </p>
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
            show={showModal && isEdit}
            handleClose={handleClose}
            handleSaveCategory={handleSaveCategory}
            currentCategory={currentCategory}
           
          />
          <AddNEWCategory
            show={showModal && isAdd}
            handleClose={handleClose}
            handleSaveCategory={handleSaveCategory}
          />
          <DeleteModal
            show={showModal && isDelete}
            handleCloseModal={handleClose}
            handleDelete={handleConfirmDelete}
            itemName="category"
          />
        </Col>
      </Row>
    </div>
  );
};

export default CategoryList;
