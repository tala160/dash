import { useEffect, useState, useMemo } from "react";

import { Button, Form, Container, Row, Col, Table } from 'react-bootstrap';
import OrderModal from '../../components/Modals/OrderModal'; 
import Pagination from '../../components/Uitily/Pagination'; 
import { FaEdit } from 'react-icons/fa'; 
import { GetAllorders, UpdateOrderPrice, UpdateOrderStatus } from "../../api/orders.api";

import { showSuccessNotification, showErrorNotification,} from "../../services/NotificationService";
import { Toaster } from "react-hot-toast";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({ id: null, total: '', status: '' });
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //Closes the modal and resets the state variables
  const handleClose = () => {
    setShowModal(false);
    setCurrentOrder({ id: null, total: '', status: '' });
  };

  const handleShow = (order) => {
    setCurrentOrder(order);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentOrder({ ...currentOrder, [name]: value });
  };

  //------------------------------------- EDIT ------------------------------------------
const handleSaveChanges = async () => {
  try {
    const originalOrder = orders.find(o => o.id === currentOrder.id);
    
    if (currentOrder.total !== originalOrder.total) {
      await UpdateOrderPrice(currentOrder.id, currentOrder.total);
    }
    
    if (currentOrder.status !== originalOrder.status) {
      await UpdateOrderStatus(currentOrder.id, currentOrder.status);
    }
    
    setOrders(orders.map(order => 
      order.id === currentOrder.id ? {...order, ...currentOrder} : order
    ));
    
    handleClose();
    showSuccessNotification("Order updated successfully!");
  } catch (error) {
    console.error("Error updating order:", error.message);
    showErrorNotification("Failed to update order.", error);
  }
};
// ----------------------Fetch------------------------------------------
// Fetch orders from the server on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await GetAllorders();
        setOrders(response.data); 
      } catch (err) {
        console.error("Error fetching orders:", err.message);
      }
    };

    fetchOrders();
  }, []);

// ----------------------search--------------------------------------------

  // Reset page when search query changes
  useEffect(() => {
    setCurrentPage(1); 
  }, [searchQuery]);

  // Filter orders based on search query
  const filteredOrders = orders.filter(order =>
    order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

   // Current orders for display
  const currentOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage); // إرجاع الطلبات المصفاة للصفحة الحالية
  }, [currentPage, filteredOrders]);

  return (
    <Container className="my-5 main-container">
        <Toaster position="top-right" reverseOrder={false} />
      <Row className="justify-content-center">
        <Col md={12}>
          <h1 className="text-center mb-4">Order List</h1>

         
          <Form.Group controlId="search" className="mb-3">
            <Form.Control 
              type="text" 
              placeholder="Search by order name or customer name" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </Form.Group>

          <div className="table-responsive"> 
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Order Name</th>
                  <th>Total Price</th>
                  <th>Quantity</th>
                  <th>Customer Name</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.length > 0 ? (
                  currentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.name}</td>
                      <td>{order.total}</td>
                      <td>{order.quantity}</td>
                      <td>{order.customer}</td>
                      <td>{order.status}</td>
                      <td>{order.date}</td>
                      <td>
                        <Button variant="warning" onClick={() => handleShow(order)}> <FaEdit /></Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="7" className="text-center">No orders found matching your search.</td></tr> // رسالة عند عدم وجود طلبات
                )}
              </tbody>
            </Table>
          </div>

        
          {filteredOrders.length > itemsPerPage && (
            <Pagination
              totalItems={filteredOrders.length} 
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}

         
          <OrderModal
            show={showModal}
            handleClose={handleClose}
            handleSaveChanges={handleSaveChanges}
            currentOrder={currentOrder}
            handleChange={handleChange}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default OrderList;
