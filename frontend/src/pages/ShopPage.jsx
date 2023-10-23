import React from 'react'
import Categories from './../components/categories/Categories';
import Products from './../components/products/Products';
import CampaingSingle from './../components/campaingSingle/CampaingSingle';

const ShopPage = () => {
  return (
    <React.Fragment>
      <Categories />
      <Products />
      <CampaingSingle />
      <Products />
    </React.Fragment>
  )
}

export default ShopPage