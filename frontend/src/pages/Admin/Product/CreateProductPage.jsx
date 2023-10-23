import { Form, Button, Input, message, InputNumber, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const CreateProductPage = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([])
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${apiUrl}/api/categories`);

                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    message.error("Failed.");
                }
            } catch (error) {
                console.log("Login Error:", error);
            } finally {
                setLoading(false)
            }
        }
        fetchCategories();
    }, [apiUrl])

    const onFinish = async (values) => {
        const imgLinks = values.img.split("\n").map((link) => link.trim());
        const colors = values.colors.split("\n").map((link) => link.trim());
        const sizes = values.sizes.split("\n").map((link) => link.trim());
        try {
            const response = await fetch(`${apiUrl}/api/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify
                    ({
                        ...values,
                        price: {
                            current: values.current,
                            discount: values.discount
                        },
                        img: imgLinks,
                        colors,
                        sizes
                    }),
            });

            if (response.ok) {
                message.success("Product was created");
                form.resetFields();
                navigate("/admin/products")
            } else {
                message.error("Error.");
            }
        } catch (error) {
            console.log("Error:", error);
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
                label="Product Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Lütfen ürün adını girin!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Product Category"
                name="category"
                rules={[
                    {
                        required: true,
                        message: "Please Select Category",
                    },
                ]}
            >
                <Select>
                    {
                        categories?.map((category) => (
                            <Select.Option values={category._id} key={category._id}>{category.name}</Select.Option>
                        ))
                    }

                </Select>
            </Form.Item>
            <Form.Item
                label="Price"
                name="current"
                rules={[
                    {
                        required: true,
                        message: "Please enter price",
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="Discount"
                name="discount"
                rules={[
                    {
                        required: false,
                        message: "Please enter discount",
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="Product Description"
                name="description"
                rules={[
                    {
                        required: false,
                        message: "Please enter Product Description",
                    },
                ]}
            >
                <ReactQuill theme="snow" style={{ backgroundColor: "white" }} />
            </Form.Item>
            <Form.Item
                label="Product Image (Link)"
                name="img"
                rules={[
                    {
                        required: true,
                        message: "Please enter Product Image Link",
                    },
                ]}
            >
                <Input.TextArea autoSize={{ minRows: 4 }} />
            </Form.Item>
            <Form.Item
                label="Product Colors (RGB Code)"
                name="colors"
                rules={[
                    {
                        required: true,
                        message: "Please enter Product Colors",
                    },
                ]}
            >
                <Input.TextArea autoSize={{ minRows: 4 }} />
            </Form.Item>
            <Form.Item
                label="Product Sizes"
                name="sizes"
                rules={[
                    {
                        required: true,
                        message: "Please enter Product Sizes",
                    },
                ]}
            >
                <Input.TextArea autoSize={{ minRows: 4 }} />
            </Form.Item>
            <Button type="primary" htmlType="submit">
                Add New Product
            </Button>
        </Form>
    )
}

export default CreateProductPage