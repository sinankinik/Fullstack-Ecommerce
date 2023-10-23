import React, { useContext, useState } from 'react'
import "./cart.css"
import CartProgress from './CartProgress';
import CartTable from './CartTable';
import CartCoupon from './CartCoupon';
import CartTotals from './CartTotals';
import { CartContext } from '../../context/CartProvider';


const Cart = () => {
    const { cartItems } = useContext(CartContext)

    return (
        <section className="cart-page">
            <div className="container">
                {cartItems.length > 0 ?
                    <div className="cart-page-wrapper">
                        <form className="cart-form">
                            <CartProgress />
                            <div className="shop-table-wrapper">
                                <CartTable />
                                <CartCoupon />
                            </div>
                        </form>
                        <div className="cart-collaterals">
                            <CartTotals />
                        </div>
                    </div> :
                    <div>
                        <h3>Sepette Ürününüz Bulunmamaktadır.</h3>
                    </div>
                }
            </div>
        </section>
    )
}

export default Cart