import { Row, Col, Card, Statistic } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const DashboardPage = () => {
  const productSalesData = [
    { name: "January", product: 10 },
    { name: "February", product: 15 },
    { name: "March", product: 20 },
    { name: "April", product: 25 },
    { name: "May", product: 30 },
    { name: "June", product: 35 },
  ];

  const customerData = [
    { name: "January", customer: 20 },
    { name: "February", customer: 25 },
    { name: "March", customer: 30 },
    { name: "April", customer: 10 },
    { name: "May", customer: 40 },
    { name: "June", customer: 45 },
  ];

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Products" value={120} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Customers" value={50} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Incomes" value={3000} prefix="$" />
          </Card>
        </Col>
      </Row>
      <Card style={{ marginTop: "20px" }}>
        <h2>Product</h2>
        <LineChart
          width={600}
          height={600}
          data={productSalesData}
          margin={{ top: 5, right: 30, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="product"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </Card>
      <Card style={{ marginTop: "20px" }}>
        <h2>Customers</h2>
        <LineChart
          width={600}
          height={300}
          data={customerData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="customer"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </Card>
    </div>
  );
};

export default DashboardPage;