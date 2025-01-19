import { useEffect, useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { GetAllProducts } from "../../api/products.api";
import ProductModal from "../../components/Modals/ProductModal";
import DeleteModal from "../../components/Modals/DeleteModal";

const ProductList = () => {
  const [products, setProducts] = useState([]);
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
        { ...currentProduct, id: Math.random(10) },
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

  const renderedProducts = useMemo(() => {
    return products.map((product) => (
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
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => handleShowDeleteModal(product.id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));
  }, [products]);

  return (
    <div className="main-container mt-5">
      <h1 className="text-center mb-4">Product List</h1>
      <Button onClick={() => handleShowModal(false)} className="mb-3">
        Add New Product
      </Button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped table-bordered table-responsive">
          <thead className="table-dark">
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
