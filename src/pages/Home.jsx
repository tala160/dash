import { FaBoxOpen } from 'react-icons/fa'; 
import { BiCategory } from 'react-icons/bi'; 
import { FiShoppingCart , FiClock } from 'react-icons/fi'; 
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import "../App.css";
import { httpApi } from '../api/http.api'; 

function Home() {

  // const [data, setData] = useState([]);
  // const [productsCount, setProductsCount] = useState(0);
  // const [categoriesCount, setCategoriesCount] = useState(0);
  // const [PendingOrdersCount, setPendingOrdersCount] = useState(0);
  // const [DeliveredOrdersCount, setDeliveredOrdersCount] = useState(0);


  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];



// useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetching the main data for charts
//         const response = await httpApi.get('/your-endpoint'); 
//         setData(response.data); // Assuming the data is in response.data

//         // Fetching counts for products, categories, PendingOrders, and Delivered Orders
//         const countsResponse = await httpApi.get('/counts-endpoint'); 
//         setProductsCount(countsResponse.data.products); 
//         setCategoriesCount(countsResponse.data.categories); 
//         setPendingOrdersCount(countsResponse.data.PendingOrders); 
//         setDeliveredOrdersCount(countsResponse.data.DeliveredOrders); 
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);


  return (
    <main className="main-container">
     

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Products</h3>
            <FaBoxOpen className="card_icon" />
          </div>
          <h1>300</h1>
          {/* <h1>{productsCount}</h1> //Display dynamic count */}
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Categories</h3>
            <BiCategory className="card_icon" />
          </div>
          <h1>12</h1>
          {/* <h1>{categoriesCount}</h1> //Display dynamic count */}
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Pending Orders</h3>
            <FiClock className="card_icon" />
          </div>
          <h1>33</h1>
          {/* <h1>{Pending Orders}</h1> //Display dynamic count */}
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Delivered Orders</h3>
            <FiShoppingCart className="card_icon" />
          </div>
          <h1>42</h1>
          {/* <h1>{DeliveredOrdersCount}</h1> //Display dynamic count */}
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
