import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import { GetAllProducts } from "../../api/products.api";

const ProductList = () => {
  // State to hold the list of products with additional fields
  const [products, setProducts] = useState([
    // { id: 1, title: "Product 1", price: "$10", qa: "5", category: "clothes" },
    // { id: 2, title: "Product 2", price: "$20", qa: "5", category: "clothes" },
    // { id: 3, title: "Product 3", price: "$30", qa: "5", category: "clothes" },
  ]);

  // State for editing a product
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    title: "",
    price: "",
    qa: "",
    category: "",
    isAddVisible: false,
  });
  const [loading, setLoading] = useState(true);

  const handleAddVisible = () => {
    setCurrentProduct({ ...currentProduct, isAddVisible: true });
  };
  // Function to delete a product by its ID
  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Function to show the modal for editing a product
  const handleShow = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setShowModal(false);
  };

  // Function to save changes made to the current product
  const handleSaveChanges = () => {
    setProducts(
      products.map((product) =>
        product.id === currentProduct.id ? currentProduct : product
      )
    );
    handleClose(); // Close the modal after saving changes
  };

  // Function to handle changes in input fields of the modal
  const handleChange = (e) => {
    const { name, value } = e.target; // Get input name and value
    setCurrentProduct({ ...currentProduct, [name]: value }); // Update current product state
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GetAllProducts();
        setProducts(response.data); // Assuming `response.data` contains the product list
      } catch (err) {
        console.log(
          err.message || "An error occurred while fetching products."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    console.log(e);
    setProducts([...products, { ...currentProduct, id: products.length + 1 }]);
    setCurrentProduct({
      title: "",
      price: "",
      qa: "",
      category: "",
    });
    handleClose(); // Close modal after adding
  };

  return (
    <div className="main-container mt-5">
      <h1 className="text-center mb-4">Product List</h1>
      {/* <Link to="/addproduct" className="btn btn-success mb-3">
        Add New Product
      </Link> */}
      <button onClick={handleAddVisible}>Add New Product</button>
      <table className="table table-striped table-bordered table-responsive">
        <thead className="table-dark">
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>QA</th> {/* Added QA column */}
            <th>Category</th> {/* Added Category column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.qa}</td> {/* Displaying QA */}
              <td>{product.category}</td> {/* Displaying Category */}
              <td>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => handleShow(product)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* add */}
      <Modal show={currentProduct.isAddVisible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProduct}>
            <Form.Group controlId="formNewCategory">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={currentProduct.title}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    title: e.target.value,
                  })
                }
                required
              />
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                value={currentProduct.category}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    category: e.target.value,
                  })
                }
                required
              />
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={currentProduct.price}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    price: e.target.value,
                  })
                }
                required
              />
              <Form.Label>QA</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter QA"
                value={currentProduct.qa}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, qa: e.target.value })
                }
                required
              />
            </Form.Group>
            <Button
              onClick={() =>
                setCurrentProduct({ ...currentProduct, isAddVisible: false })
              }
              variant="primary"
              type="submit"
              className="mt-3 w-100"
            >
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for editing a product */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="title"
                value={currentProduct.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                name="price"
                value={currentProduct.price}
                onChange={handleChange}
              />
            </Form.Group>

            {/* New input field for QA */}
            <Form.Group controlId="formProductQA">
              <Form.Label>QA</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter QA"
                name="QA"
                value={currentProduct.qa}
                onChange={handleChange}
              />
            </Form.Group>

            {/* New input field for Category */}
            <Form.Group controlId="formProductCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                name="category"
                value={currentProduct.category}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* Button to cancel changes and close modal */}
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          {/* Button to save changes made in the modal */}
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductList;
