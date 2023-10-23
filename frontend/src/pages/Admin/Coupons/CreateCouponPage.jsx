import { Form, Button, Input, message, InputNumber } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const CreateCouponPage = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const response = await fetch(`${apiUrl}/api/coupons`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success("Category Added");
                form.resetFields();
                navigate("/admin/coupons")
            } else {
                message.error("Failed");
            }
        } catch (error) {
            console.log("Failed:", error);
        }
    };
    return (
        <Form
            form={form}
            name="basic"
            layout="vertical"
            autoComplete="off"
            onFinish={onFinish} >
            <Form.Item
                label="Kupon Kodu"
                name="code"
                rules={[
                    {
                        required: true,
                        message: "Please enter the coupon code",
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
                        message: "Please enter the coupon code discount percent",
                    },
                ]}
            >
                <InputNumber />
            </Form.Item> <Button type="primary" htmlType="submit">
                Add New Coupon
            </Button>
        </Form>
    )
}

export default CreateCouponPage