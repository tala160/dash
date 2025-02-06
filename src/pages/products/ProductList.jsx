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
import ProductModal from "../../components/Modals/ProductModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import Pagination from "../../components/Pagination";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    title: "",
    price: "",
    qa: "",
    category: "",
    images: [],
  });

  const [productToDelete, setProductToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  const validateProduct = (product) => {
    if (!product.title || !product.price || !product.qa || !product.category) {
      alert("All fields are required.");
      return false;
    }
    if (isNaN(product.price)) {
      alert("Price must be a number.");
      return false;
    }
    return true;
  };

  //go to the first page
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleShowModal = (edit, product = null) => {
    setIsEdit(edit);
    setCurrentProduct(
      product || { id: null, title: "", price: "", qa: "", category: "" }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentProduct({
      id: null,
      title: "",
      price: "",
      qa: "",
      category: "",
      images: [],
    });
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleShowDeleteModal = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
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
      setError(null); // Clear any previous errors
      const response = await GetAllProducts();
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err.message);
      setError("Failed to load products."); // Set the error state
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
      console.error("Error fetching categories:", err.message);
      setError("Failed to load categories."); // Set the error state
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]); // Dependencies for useEffect

  // Function to handle saving/updating a product
  const handleSaveProduct = async (product) => {
    try {
      if (!validateProduct(product)) {
        return;
      }

      if (isEdit) {
        await UpdateProduct(product.id, product);
        // Optimistic update (optional): Update the product in the state immediately
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === product.id ? product : p))
        );
      } else {
        const newProduct = await AddNewProduct(product);
        // Optimistic update (optional): Add the new product to the state immediately
        setProducts((prevProducts) => [...prevProducts, newProduct]); // Use the returned newProduct
      }

      handleCloseModal();
      fetchProducts(); // Refresh product list after successful save (remove if using optimistic updates)
    } catch (error) {
      console.error("Error saving product:", error);
      setError("Failed to save product."); // Set the error state
    }
  };

  // Function to handle deleting a product
  const handleDelete = async () => {
    try {
      await DeleteProduct(productToDelete);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productToDelete)
      ); // Optimistic update
      handleCloseDeleteModal();
      fetchProducts(); // Refresh product list after successful delete (remove if using optimistic updates)
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product."); // Set the error state
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
            onClick={() => handleShowModal(true, product)}
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
    handleShowModal,
    handleShowDeleteModal,
  ]); // Include all dependencies

  return (
    <div className="my-5 main-container">
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
                onClick={() => handleShowModal(false)}
                className="w-100 "
                style={{ backgroundColor: "#a1dee5d1", border: "none" }}
              >
                Add New Product
              </Button>
            </Col>
          </Row>

          {/* Error Handling */}
          {error && <p className="text-danger">{error}</p>}

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

          <ProductModal
            show={showModal}
            isEdit={isEdit}
            product={currentProduct}
            handleChange={handleChange}
            handleCloseModal={handleCloseModal}
            handleSaveProduct={handleSaveProduct}
            categories={categories}
          />

          <DeleteModal
            show={showDeleteModal}
            handleCloseModal={handleCloseDeleteModal}
            handleDelete={handleDelete}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProductList;
