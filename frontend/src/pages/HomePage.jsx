import React from 'react'
import Sliders from './../components/slider/Sliders';
import Categories from './../components/categories/Categories';
import Products from './../components/products/Products';
import Campaings from './../components/campaings/Campaings';
import Blogs from './../components/blogs/Blogs';
import Brands from './../components/brands/Brands';
import CampaingSingle from './../components/campaingSingle/CampaingSingle';

const HomePage = () => {
    return (
        <React.Fragment>
            <Sliders />
            <Categories />
            <Products />
            <Campaings />
            <Products />
            <Blogs />
            <Brands />
            <CampaingSingle />
        </React.Fragment>
    )
}

export default HomePage