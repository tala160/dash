import { useEffect, useState, useMemo, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Row, Col } from "react-bootstrap";
import {
  GetAllProducts,
  AddNewProduct,
  UpdateProduct,
  DeleteProduct,
} from "../../api/products.api";
import { GetAllCategories } from "../../api/Categories.api";
import {  readUser } from '../../services/localStorage.service';

import AddProduct from "../../components/Modals/Product/AddProduct";
import EditProduct from "../../components/Modals/Product/EditProduct";
import DeleteModal from "../../components/Modals/DeleteModal";

import Pagination from "../../components/Pagination";
import { FaEdit, FaTrash } from "react-icons/fa";
import { showSuccessNotification, showErrorNotification } from '../../services/NotificationService';
import { Toaster } from 'react-hot-toast';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProduct, setCurrentProduct] = useState({id: null,title: "",price: "",qa: "",category: "",images: [],});

  // const [productToDelete, setProductToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null); // Added error state
  const [token, setToken] = useState(null); // Token state

  // Read token from localStorage
  useEffect(() => {
    const storedUser = readUser();
    setToken(storedUser?.token || null);
  }, []);


  //go to the first page
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  //close
  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  //show
  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleShowEditModal = (product , storedToken) => {
    setCurrentProduct(product);
    setShowEditModal(true);
    setToken(storedToken)
  };

  
  const handleShowDeleteModal = (id , storedToken) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
    setToken(storedToken)
  };

  // Pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Products for current page
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    // Filter products based on search query
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredProducts.slice(start, start + itemsPerPage); // Return filtered products
  }, [currentPage, products, searchQuery]);

  const fetchProducts = useCallback(async () => {
    // Use useCallback to prevent unnecessary re-renders
    try {
      setLoading(true);
      const response = await GetAllProducts();
      setProducts(response.data);
    } catch (err) {
      showErrorNotification("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    // Use useCallback to prevent unnecessary re-renders
    try {
      const response = await GetAllCategories();
      setCategories(response.data);
    } catch (err) {
      
      showErrorNotification("Failed to load categories.");
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]); // Dependencies for useEffect

  // Function to handle saving/updating a product
  const handleSaveProduct = async (product) => {
    try {
      if (!token) {
        showErrorNotification("Authentication token is missing.");
        return;
      }
 
      if (!validateProduct(product)) {
        return;
      }
 
      if (product.id) {
        await UpdateProduct(product.id, product, token); // Pass token here
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === product.id ? product : p))
        );
        showSuccessNotification("Product updated successfully!");
        handleCloseEditModal();
      } else {
        const response = await AddNewProduct(product, token); // Pass token here
        if (response.status === 201 || response.status === 200) {
          setProducts((prevProducts) => [...prevProducts, response.data]); // Use response.data
          showSuccessNotification("Product added successfully!");
          handleCloseAddModal();
        } else {
          throw new Error("Failed to add product");
        }
      }
    } catch (err) {
      
      showErrorNotification("Failed to save product.");
    }
  };
 

  // Function to handle deleting a product
  const handleDelete = async () => {
    try {
      if (!token) {
        showErrorNotification("Authentication token is missing.");
        return;
      }
  
      await DeleteProduct(productToDelete, token);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productToDelete)
      ); // Optimistic update
      handleCloseDeleteModal();
      showSuccessNotification("Product deleted successfully!");
    } catch (err) {
      
      showErrorNotification("Failed to delete product.");
    }
  };
  

  // Rendered Products
  const renderedProducts = useMemo(() => {
    return currentProducts.map((product) => (
      <tr key={product.id}>
        <td>{product.title}</td>
        <td>{product.price}</td>
        <td>{product.qa}</td>
        <td>{product.category}</td>
        <td>
          <div className="d-flex">
            {product.images &&
              product.images.map((image, index) =>
                image ? (
                  <img
                    key={index}
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "5px",
                      marginRight: "5px",
                    }}
                  />
                ) : null
              )}
          </div>
        </td>
        <td>
          <Button
            variant="warning"
            className="me-2"
            onClick={() => handleShowEditModal(product)}
          >
            <FaEdit />
          </Button>
          <Button
            variant="danger"
            onClick={() => handleShowDeleteModal(product.id)}
          >
            <FaTrash />
          </Button>
        </td>
      </tr>
    ));
  }, [
    currentProducts,
    handleShowEditModal,
    handleShowDeleteModal,
  ]); // Include all dependencies

  return (
    <div className="my-5 main-container">
      <Toaster position="top-right" reverseOrder={false} />
      <Row>
        <Col md={12}>
          <h1 className="text-center mb-4">Product List</h1>

          {/* Search input field */}
          <Row className="mb-3">
            <Col md={8}>
              <Form.Group controlId="search" className="mb-0">
                <Form.Control
                  type="text"
                  placeholder="Search by product name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Button
                onClick={handleShowAddModal}
                className="w-100 "
                style={{ backgroundColor: "#a1dee5d1", border: "none" }}
              >
                Add New Product
              </Button>
            </Col>
          </Row>

       
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {renderedProducts.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-striped table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>QA</th>
                        <th>Category</th>
                        <th>Images</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>{renderedProducts}</tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center">
                  No products found matching your search.
                </p>
              )}
            </>
          )}
          {/* Pagination */}
          {products.length > 0 && (
            <Pagination
              totalItems={products.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}

          <AddProduct
            show={showAddModal}
            handleCloseModal={handleCloseAddModal}
            handleSaveProduct={handleSaveProduct}
            categories={categories}
            token={token}
          />

          <EditProduct
            show={showEditModal}
            handleCloseModal={handleCloseEditModal}
            handleSaveProduct={handleSaveProduct}
            categories={categories}
            product={currentProduct}
            token={token}
          />

          <DeleteModal
            show={showDeleteModal}
            handleCloseModal={handleCloseDeleteModal} // Pass handleCloseModal
            handleDelete={handleDelete}
            itemName="product"
            token={token}
          />

        </Col>
      </Row>
    </div>
  );
};

export default ProductList;
