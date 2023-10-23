import React from 'react'
import "./productDetails.css"
import BreadCrumb from './breadCrumb/BreadCrumb';
import Gallery from './gallery/Gallery';
import Info from './info/Info';
import Tabs from './tabs/Tabs';

const ProductDetails = ({singleProduct, setSingleProduct}) => {
    return (
        <section className="single-product">
            <div className="container">
                <div className="single-product-wrapper">
                    <BreadCrumb />
                    <div className="single-content">
                        <main className="site-main">
                            <Gallery singleProduct={singleProduct}/>
                            <Info singleProduct={singleProduct}/>
                        </main>
                    </div>
                    <Tabs singleProduct={singleProduct} setSingleProduct={setSingleProduct} />

                </div>
            </div>
        </section>
    )
}

export default ProductDetails