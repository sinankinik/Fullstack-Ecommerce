import { Button, Popconfirm, Space, Table, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

const ProductPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const apiUrl = import.meta.env.VITE_API_BASE_URL;


    const columns = [
        {
            title: "Image",
            dataIndex: "img",
            key: "img",
            render: (imgSrc) => (
                <img
                    src={imgSrc[0]}
                    alt="Product Image"
                    style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                    }}
                />
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Category",
            dataIndex: "categoryName",
            key: "categoryName",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (text) => <b>{text.current.toFixed(2)}</b>
        },
        {
            title: "Discount",
            dataIndex: "price",
            key: "price",
            render: (text) => <b>%{text.discount.toFixed(2)}</b>
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button type='primary' onClick={() => navigate(`/admin/products/update/${record._id}`)}>Edit</Button>
                    <Popconfirm
                        title="Delete Product"
                        description="Are you sure to delete this Product?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteProduct(record._id)}
                    >
                        <Button type='primary' danger>Delete</Button>
                    </Popconfirm>
                </Space>
            )
        },
    ];


    const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`${apiUrl}/api/products/${productId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                message.success("Product Deleted")
                setDataSource((prevProducts) => {
                    return prevProducts.filter((product) => product._id !== productId)
                })
            } else {
                message.error("Failed.");
            }
        } catch (error) {
            console.log("Failed:", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const [categoriesResponse, productsResponse] = await Promise.all([
                    fetch(`${apiUrl}/api/categories`),
                    fetch(`${apiUrl}/api/products`)
                ])

                if (!categoriesResponse.ok || !productsResponse.ok) {
                    message.error("Failed");
                }

                const [categoriesData, productsData] = await Promise.all([
                    categoriesResponse.json(),
                    productsResponse.json()
                ])

                const productsWithCategories = productsData.map((product) => {
                    const categoryId = product.category;
                    const category = categoriesData.find(
                        (item) => item._id === categoryId
                    );
                    return {
                        ...product, categoryName: category ? category.name : ""
                    }
                });

                setDataSource(productsWithCategories)
            } catch (error) {
                console.log("Failed:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [apiUrl]);

    return (
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={(record) => record._id}
                loading={loading}
            />
            <Button type='primary' onClick={() => navigate("/admin/products/create")} > Add New Product</Button>
        </div >
    );
};

export default ProductPage;