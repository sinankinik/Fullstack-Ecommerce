import { Button, Layout, Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  RollbackOutlined,
  BarcodeOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { Content, Header } from 'antd/es/layout/layout';
import { PropTypes } from 'prop-types';
const { Sider } = Layout

const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  return user ? user.role : null
}

const AdminLayout = ({ children }) => {

  const navigate = useNavigate();
  const userRole = getUserRole();

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/admin",
      onClick: () => {
        navigate(`/admin`);
      },
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Categories",
      path: "/",
      children: [
        {
          key: "3",
          label: "Category List",
          path: "/admin/categories",
          onClick: () => {
            navigate(`/admin/categories`);
          },
        },
        {
          key: "4",
          label: "Add New Category",
          path: "/admin/categories/create",
          onClick: () => {
            navigate("/admin/categories/create");
          },
        },
      ],
    },
    {
      key: "5",
      icon: <LaptopOutlined />,
      label: "Products",
      path: "/",
      children: [
        {
          key: "6",
          label: "Product List",
          path: "/admin/products",
          onClick: () => {
            navigate(`/admin/products`);
          },
        },
        {
          key: "7",
          label: "Add New Product",
          path: "/admin/products/create",
          onClick: () => {
            navigate("/admin/products/create");
          },
        },
      ],
    },
    {
      key: "8",
      icon: <BarcodeOutlined />,
      label: "Coupons",
      path: "/admin/coupons",
      children: [
        {
          key: "9",
          label: "Coupon List",
          path: "/admin/coupons",
          onClick: () => {
            navigate(`/admin/coupons`);
          },
        },
        {
          key: "10",
          label: "Add New Coupon",
          path: "/admin/coupons/create",
          onClick: () => {
            navigate("/admin/coupons/create");
          },
        },
      ],
    },
    {
      key: "11",
      icon: <UserOutlined />,
      label: "User List",
      path: "/admin/users",
      onClick: () => {
        navigate(`/admin/users`);
      },
    },
    {
      key: "12",
      icon: <ShoppingCartOutlined />,
      label: "Orders",
      onClick: () => {
        navigate(`/admin/orders`);
      },
    },
    {
      key: "13",
      icon: <RollbackOutlined />,
      label: "Back to Home",
      onClick: () => {
        window.location.href = "/";
      },
    },
  ];

  const getPageTitle = () => {
    for (const item of menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === window.location.pathname) {
            return child.label;
          }
        }
      } else {
        if (item.path === window.location.pathname) {
          return item.label;
        }
      }
    }
  };

  if (userRole === "admin") {

    return (
      <div className="admin-layout">
        <Layout style={{ minHeight: "100vh" }}>
          <Sider width={200} theme='dark'>
            <Menu mode="vertical" style={{ height: "100%" }} items={menuItems} />
          </Sider>
          <Layout>
            <Header >
              <div style={{ display: "flex", justifyContent: "space-between", color: "white" }}>
                <h2>{getPageTitle()}</h2>
                <h2>Admin Panel</h2>
              </div>
            </Header>
            <Content>
              <div className='site-layout-background' style={{ padding: "24px 50px", minHeight: 360 }}>
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  } else {
    window.location.href = "/"
  }
}

export default AdminLayout;
AdminLayout.propTypes = {
  children: PropTypes.node
}