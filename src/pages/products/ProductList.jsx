import { useEffect, useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import { GetAllProducts } from "../../api/products.api";
import ProductModal from "../../components/Modals/ProductModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import Pagination from '../../components/Pagination';
import { FaEdit, FaTrash } from 'react-icons/fa'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    title: "",
    price: "",
    qa: "",
    category: "",
  });
  
  const [productToDelete, setProductToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  
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
  
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!validateProduct(currentProduct)) return;
    
    if (isEdit) {
      setProducts((prev) =>
        prev.map((p) => (p.id === currentProduct.id ? currentProduct : p))
      );
    } else {
      setProducts((prev) => [
        ...prev,
        { ...currentProduct, id: Date.now() }, // Use Date.now() for unique ID
      ]);
    }
    
    handleCloseModal();
  };
  
  const handleDelete = () => {
    setProducts((prev) =>
      prev.filter((product) => product.id !== productToDelete)
    );
    handleCloseDeleteModal();
  };

  // Pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }; 
  
  // Products for current page
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    
    // Filter products based on search query
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredProducts.slice(start, start + itemsPerPage); // Return filtered products
  }, [currentPage, products, searchQuery]);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GetAllProducts();
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Rendered Products
  const renderedProducts = useMemo(() => {
    return currentProducts.map((product) => (
      <tr key={product.id}>
        <td>{product.title}</td>
        <td>{product.price}</td>
        <td>{product.qa}</td>
        <td>{product.category}</td>
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
  }, [currentProducts]);

  
  return (
    <div className="main-container  mt-5">
      <h1 className="text-center mb-4">Product List</h1>
      
      {/* Search input field */}
      <div className="d-flex justify-content-between mb-3">
        <Form.Group controlId="search" className="flex-grow-1 me-2">
          <Form.Control 
            type="text" 
            placeholder="Search by product name" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </Form.Group>

        <Button onClick={() => handleShowModal(false)} variant="primary">
          Add New Product
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {renderedProducts.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <thead >
                  <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>QA</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{renderedProducts}</tbody>
              </table>
            </div>
          ) : (
            <p className="text-center">No products found matching your search.</p> // Message when no products are found
          )}
        </>
      )}
      
       {/* Pagination */}
       {renderedProducts.length > 0 && (
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
      />

      <DeleteModal
        show={showDeleteModal}
        handleCloseModal={handleCloseDeleteModal}
        handleDelete={handleDelete}
      />
      
    </div>
  );
};

export default ProductList;
