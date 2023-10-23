import { Form, Button, Input, message, InputNumber, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const CreateProductPage = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([])
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const params = useParams();
    const productId = params.id

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const [categoriesResponse, singleProductResponse] = await Promise.all([
                    fetch(`${apiUrl}/api/categories`),
                    fetch(`${apiUrl}/api/products/${productId}`)
                ])

                if (!categoriesResponse.ok || !singleProductResponse.ok) {
                    message.error("Failed");
                }

                const [categoriesData, singleProductsData] = await Promise.all([
                    categoriesResponse.json(),
                    singleProductResponse.json()
                ])
                setCategories(categoriesData)
                if (singleProductsData) {
                    form.setFieldsValue({
                        name: singleProductsData.name,
                        current: singleProductsData.price.current,
                        discount: singleProductsData.price.discount,
                        description: singleProductsData.description,
                        img: singleProductsData.img.join("\n"),
                        colors: singleProductsData.colors.join("\n"),
                        sizes: singleProductsData.sizes.join("\n"),
                        category: singleProductsData.category


                    })
                }
            } catch (error) {
                console.log("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [apiUrl, productId, form]);

    const onFinish = async (values) => {
        const imgLinks = values.img.split("\n").map((link) => link.trim());
        const colors = values.colors.split("\n").map((link) => link.trim());
        const sizes = values.sizes.split("\n").map((link) => link.trim());
        try {
            const response = await fetch(`${apiUrl}/api/products/${productId}`, {
                method: "PUT",
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
                message.success("Product Was Updated");
                form.resetFields();
                navigate("/admin/products")
            } else {
                message.error("Error");
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
                        message: "Please Enter Product Name",
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
                        message: "Please Enter Price",
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
                        message: "Please Enter Product Description",
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
                        message: "Please Enter Product Image (Link)",
                    },
                ]}
            >
                <Input.TextArea autoSize={{ minRows: 4 }} />
            </Form.Item>
            <Form.Item
                label="Product Colors (RGB code)"
                name="colors"
                rules={[
                    {
                        required: true,
                        message: "Please Enter Product Colors",
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
                        message: "Please Enter Product Sizes",
                    },
                ]}
            >
                <Input.TextArea autoSize={{ minRows: 4 }} />
            </Form.Item>
            <Button type="primary" htmlType="submit">
                Update Product
            </Button>
        </Form>
    )
}

export default CreateProductPage