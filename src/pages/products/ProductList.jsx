import { useState, useMemo, useEffect } from "react";
import { Button, Row, Col, Form, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

import EditProduct from "../../components/Modals/Product/EditProduct";
import AddProduct from "../../components/Modals/Product/AddProduct";
import DeleteModal from "../../components/Modals/DeleteModal";

import Pagination from "../../components/Uitily/Pagination";
import { GetAllCategories } from "../../api/categories.api";
import {GetAllProducts, AddNewProduct,  UpdateProduct,  DeleteProduct,} from "../../api/products.api";
import {  showSuccessNotification,  showErrorNotification,} from "../../services/NotificationService";
import { Toaster } from "react-hot-toast";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: "",
    price: 0,
    categoryId: null,
    images: [],
  }); 
  // Stores the Product being edited/deleted
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  //Closes the modal and resets the state variables
  function handleClose() {
    setShowModal(false);
    setIsEdit(false);
    setIsAdd(false);
    setIsDelete(false);
    setCurrentProduct({ id: null, name: "", price: 0, categoryId: null, images: [] });
  }
  //Shows the modal for adding a new Product
  const handleShow = () => {
    setShowModal(true);
    setIsAdd(true);
    setIsEdit(false);
    setCurrentProduct({ id: null, name: "", price: 0, categoryId: null, images: [] });
  };
  //Shows the modal for editing an existing Product
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsEdit(true);
    setIsAdd(false);
    setShowModal(true);
  };
//-------------------------------------ADD & EDIT ------------------------------------------
  //Saves a new or edited Product
  const handleSaveProduct = async (formData) => {
    console.log("Received formData in handleSaveProduct:", formData)
  try {
    if (isEdit) {
      // For editing an existing product
      formData.append('id', currentProduct.id);
      const productId = formData.get('id'); 
      await UpdateProduct(productId, formData);
      setProducts(prevProducts =>
        prevProducts.map(p => (p.id === productId ? { ...p, ...Object.fromEntries(formData) } : p))
      );
      showSuccessNotification("Product updated successfully!");
    } else {
      // For adding a new product
      const response = await AddNewProduct(formData);
      if (response.status === 201 || response.status === 200) {
        setProducts(prevProducts => [...prevProducts, response.data]);
       
      } else {
        throw new Error("Failed to add Product");
      }
    }
    handleClose();
    showSuccessNotification("Product added successfully!");
  } catch (err) {
    showErrorNotification("Failed to save Product.", err.message);
    console.error("Failed to save product:", err.message);
  }
  }
// ---------------------------------------------DELETE----------------------------------------------------

  //Shows the modal for deleting an existing Product
  const handleDelete = async (productToDelete) => {
    setCurrentProduct(productToDelete); // Store the category to delete
    setIsDelete(true);
    setShowModal(true);
  };
  //Confirms the deletion of a Product
  const handleConfirmDelete = async () => {
    try {
      await DeleteProduct(currentProduct.id);
      setProducts(
        products.filter((Product) => Product.id !== currentProduct.id)
      );
      showSuccessNotification("Product deleted successfully!");
      handleClose();
    } catch (err) {
      showErrorNotification("Failed to delete Product.", err);
      showErrorNotification("Failed to delete Product.", err.message);
    }
  };


// ------------------------------------------SEARCH-------------------------------------------------------

  const itemsPerPage = 5;

  //go to the first page
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [currentPage, filteredProducts]);
// ---------------------------------------------FETCH----------------------------------------------------
  // fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await GetAllCategories();
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
        showErrorNotification("Failed to fetch categories.", err.message);
      }
    };

    fetchCategories();
  }, []);

  // fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GetAllProducts();
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err.message);
      }
    };

    fetchProducts();
  }, []);

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
                  placeholder="Search by Product name"
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
                Add New Product
              </Button>
            </Col>
          </Row>

          {currentProducts.length > 0 ? (
            <div className="table-responsive">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>
                        {product.images && product.images.length > 0 && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
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
                      <td>{product.price}</td>
                      
                      <td>{categories.find(c => c.id === product.categoryId)?.name || 'N/A'}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(product)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(product)}
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
              No products found matching your search.
            </p>
          )}

          {filteredProducts.length > itemsPerPage && (
            <Pagination
              totalItems={filteredProducts.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}

            {/* {currentProduct && currentProduct.categoryId !== null && isEdit && ( */}
              {/* <EditProduct
                show={showModal && isEdit}
                handleClose={handleClose}
                handleSaveProduct={handleSaveProduct}
                categories={categories}
                product={currentProduct}
              /> */}
            {/* )} */}
          <AddProduct
            show={showModal && isAdd}
            handleClose={handleClose}
            handleSaveProduct={handleSaveProduct}
            categories={categories}
          />
          <DeleteModal
            show={showModal && isDelete}
            handleClose={handleClose}
            handleDelete={handleConfirmDelete}
            itemName="Product"
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProductList;

