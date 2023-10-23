import { Button, Popconfirm, Space, Table, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";

const CategoryPage = () => {
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
                    src={imgSrc}
                    alt="Category Image"
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
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button type='primary' onClick={() => navigate(`/admin/categories/update/${record._id}`)}>Edit</Button>
                    <Popconfirm
                        title="Delete the user"
                        description="Are you sure to delete this category?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteCategory(record._id)}
                    >
                        <Button type='primary' danger>Delete</Button>
                    </Popconfirm>
                </Space>
            )
        },
    ];

    const fetchCategories = useCallback(async () => {
        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/api/categories`);

            if (response.ok) {
                const data = await response.json();
                setDataSource(data);
            } else {
                message.error("Data Fetching Failed");
            }
        } catch (error) {
            console.log("Login Error:", error);
        } finally {
            setLoading(false);
        }
    }, [apiUrl]);


    const deleteCategory = async (categoryId) => {
        try {
            const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                message.success("Category was deleted")
                fetchCategories();
            } else {
                message.error("Deleting Failed");
                console.log(response)
            }
        } catch (error) {
            console.log("Login Error:", error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={(record) => record._id}
                loading={loading}
            />
            <Button type='primary' onClick={() => navigate("/admin/categories/create")} > Add New Category</Button>
        </div >
    );
};

export default CategoryPage;