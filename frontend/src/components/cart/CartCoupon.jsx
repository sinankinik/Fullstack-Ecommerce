import React, { useContext, useState } from 'react'
import { CartContext } from '../../context/CartProvider';
import { message } from 'antd';

const CartCoupon = () => {
    const [couponCode, setCouponCode] = useState("")
    const { cartItems, setCartItems } = useContext(CartContext);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;


    const applyCoupon = async () => {
        if (couponCode.trim().length === 0) {
            message.error("Kupon Kodu Giriniz")
            return
        }
        try {
            const res = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`, {
            });
            if (!res.ok) {
                return message.warning("Kupon Kodu Hatalı")
            }
            const data = await res.json();
            const discountPercent = data.discountPercent;

            const updatedCartItems = cartItems.map((item) => {
                const updatedPrice = item.price * (1 - discountPercent / 100);
                return { ...item, price: updatedPrice }
            });

            setCartItems(updatedCartItems)
            message.success("Kupon Kodu Başarıyla Uygulandı.")
        } catch (error) {
            console.log("Giriş hatası:", error);
        }
    }

    return (
        <div className="actions-wrapper">
            <div className="coupon">
                <input type="text" className="input-text" placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                <button className="btn" type='button' onClick={applyCoupon}>Apply Coupon</button>
            </div>
            <div className="update-cart">
                <button className="btn" >Update Cart</button>
            </div>
        </div>
    )
}

export default CartCoupon