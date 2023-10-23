import React from 'react'
import BrandsItem from './BrandsItem'
import "./brands.css"

const Brands = () => {
    return (
        <section className="brands">
            <div className="container">
                <ul className="brand-list">
                    <BrandsItem />
                    <BrandsItem />
                    <BrandsItem />
                    <BrandsItem />
                    <BrandsItem />
                    <BrandsItem />
                </ul>
            </div>
        </section>
    )
}

export default Brands