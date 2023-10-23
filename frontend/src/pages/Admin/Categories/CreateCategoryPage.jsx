import { Form, Button, Input, message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const CreateCategoryPage = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const response = await fetch(`${apiUrl}/api/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success("Category Added");
                form.resetFields();
                navigate("/admin/categories")
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
                label="Kategori İsmi"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Please enter the category name",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Category Image (Link)"
                name="img"
                rules={[
                    {
                        required: true,
                        message: "Please enter the category image link",
                    },
                ]}
            >
                <Input />
            </Form.Item> <Button type="primary" htmlType="submit">
                Add New Category
            </Button>
        </Form>
    )
}

export default CreateCategoryPage