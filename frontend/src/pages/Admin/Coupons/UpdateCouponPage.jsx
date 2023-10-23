import { Button, Form, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const UpdateCouponPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const params = useParams();
    const couponId = params.id;
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success("Coupon was updated");
                navigate("/admin/coupons")
            } else {
                message.error("Failed");
            }
        } catch (error) {
            console.log("Failed:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchSingleCoupon = async () => {
            setLoading(true);

            try {
                const response = await fetch(`${apiUrl}/api/coupons/${couponId}`);

                if (!response.ok) {
                    throw new Error("Verileri getirme hatası");
                }

                const data = await response.json();

                console.log(data)

                if (data) {
                    form.setFieldsValue({
                        code: data.code,
                        discountPercent: data.discountPercent,
                    });
                }
            } catch (error) {
                console.log("Data Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSingleCoupon();
    }, [apiUrl, couponId, form]);
    return (
        <Spin spinning={loading}>
            <Form
                form={form}
                name="basic"
                layout="vertical"
                autoComplete="off"
                onFinish={onFinish} >
                <Form.Item
                    label="Coupon Code"
                    name="code"
                    rules={[
                        {
                            required: true,
                            message: "Please enter coupon name",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Discount Percent"
                    name="discountPercent"
                    rules={[
                        {
                            required: true,
                            message: "Please enter coupon discount percent",
                        },
                    ]}
                >
                    <Input />
                </Form.Item> <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Form>
        </Spin>
    );
};

export default UpdateCouponPage