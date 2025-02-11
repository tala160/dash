import { useEffect, useState, useMemo, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Row, Col } from "react-bootstrap";
import {
  GetAllProducts,
  AddNewProduct,
  UpdateProduct,
  DeleteProduct,
} from "../../api/products.api";
import { GetAllCategories } from "../../api/categories.api";

import AddProduct from "../../components/Modals/Product/AddProduct";
import EditProduct from "../../components/Modals/Product/EditProduct";
import DeleteModal from "../../components/Modals/DeleteModal";

import Pagination from "../../components/Pagination";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../services/NotificationService";
import { Toaster } from "react-hot-toast";

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
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleShowAddModal = () => setShowAddModal(true);
  const handleShowEditModal = (product) => {
    setCurrentProduct(product);
    setShowEditModal(true);
  };
  const handleShowDeleteModal = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [currentPage, products, searchQuery]);

  const fetchProducts = useCallback(async () => {
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
  }, [fetchProducts, fetchCategories]);

  const handleSaveProduct = async (product) => {
    try {
      if (product.id) {
        await UpdateProduct(product.id, product);
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === product.id ? product : p))
        );
        showSuccessNotification("Product updated successfully!");
        handleCloseEditModal();
      } else {
        const response = await AddNewProduct(product);
        if (response.status === 201 || response.status === 200) {
          setProducts((prevProducts) => [...prevProducts, response.data]);
          showSuccessNotification("Product added successfully!");
          handleCloseAddModal();
        } else {
          throw new Error("Failed to add product");
        }
      }
    } catch (error) {
      showErrorNotification(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      if (!productToDelete) return;

      await DeleteProduct(productToDelete);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productToDelete)
      );
      showSuccessNotification("Product deleted successfully!");
      handleCloseDeleteModal();
    } catch (err) {
      showErrorNotification("Failed to delete product.");
    }
  };

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
  }, [currentProducts]);

  return (
    <div className="my-5 main-container">
      <Toaster position="top-right" reverseOrder={false} />
      <Row>
        <Col md={12}>
          <h1 className="text-center mb-4">Product List</h1>

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
                className="w-100"
                style={{ backgroundColor: "#a1dee5d1", border: "none" }}
              >
                Add New Product
              </Button>
            </Col>
          </Row>

          {loading ? (
            <p>Loading...</p>
          ) : renderedProducts.length > 0 ? (
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
          />
          <EditProduct
            show={showEditModal}
            handleCloseModal={handleCloseEditModal}
            handleSaveProduct={handleSaveProduct}
            categories={categories}
            product={currentProduct}
          />
          <DeleteModal
            show={showDeleteModal}
            handleCloseModal={handleCloseDeleteModal}
            handleDelete={handleDelete}
            itemName="product"
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProductList;
