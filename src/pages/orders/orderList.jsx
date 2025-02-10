import { useEffect, useState, useMemo } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Container, Row, Col, Table } from 'react-bootstrap';
import OrderModal from '../../components/Modals/OrderModal'; 
import Pagination from '../../components/Pagination'; 
import { FaEdit } from 'react-icons/fa'; 
import { GetAllorders, Updateorder } from "../../api/orders.api"; 

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({ id: null, total: '', status: '' });
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  
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

  const handleSaveChanges = async () => {
    try {
      await Updateorder(currentOrder.id, currentOrder); // استدعاء API لتحديث الطلب
      setOrders(orders.map(order => 
        order.id === currentOrder.id ? currentOrder : order
      ));
      handleClose();
    } catch (error) {
      console.error("Error updating order:", error.message);
    }
  };

  // إعادة تعيين الصفحة عند تغيير الاستعلام
  useEffect(() => {
    setCurrentPage(1); 
  }, [searchQuery]);

  // تصفية الطلبات بناءً على الاستعلام
  const filteredOrders = orders.filter(order =>
    order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // الطلبات الحالية للعرض
  const currentOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage); // إرجاع الطلبات المصفاة للصفحة الحالية
  }, [currentPage, filteredOrders]);

  return (
    <Container className="my-5 main-container">
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
