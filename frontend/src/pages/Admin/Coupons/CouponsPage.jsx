import { Button, Popconfirm, Space, Table, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";

const CouponPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const apiUrl = import.meta.env.VITE_API_BASE_URL;


    const columns = [
        {
            title: "Code",
            dataIndex: "code",
            key: "name",
        },
        {
            title: "Discount Percent",
            dataIndex: "discountPercent",
            key: "name",
            render: (text) => <b>%{text.toFixed(2)}</b>
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button type='primary' onClick={() => navigate(`/admin/coupons/update/${record._id}`)}>Edit</Button>
                    <Popconfirm
                        title="Delete the coupon"
                        description="Are you sure to delete this coupon?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteCoupon(record._id)}
                    >
                        <Button type='primary' danger>Delete</Button>
                    </Popconfirm>
                </Space>
            )
        },
    ];

    const fetchCoupons = useCallback(async () => {
        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/api/coupons`);

            if (response.ok) {
                const data = await response.json();
                setDataSource(data);
            } else {
                message.error("Data Fetching Error");
            }
        } catch (error) {
            console.log("Login Error:", error);
        } finally {
            setLoading(false);
        }
    }, [apiUrl]);


    const deleteCoupon = async (couponId) => {
        console.log(couponId)
        try {
            const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                message.success("Coupon was deleted")
                fetchCoupons();
            } else {
                message.error("Deleting Failed.");
            }
        } catch (error) {
            console.log("Login Error:", error);
        }
    }

    useEffect(() => {
        fetchCoupons();
    }, [fetchCoupons]);

    return (
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={(record) => record._id}
                loading={loading}
            />
            <Button type='primary' onClick={() => navigate("/admin/categories/create")} > Add New Coupon</Button>
        </div >
    );
};

export default CouponPage;