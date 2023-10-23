import React from 'react'
import "./tabs.css"
import Reviews from '../../reviews/Reviews'
import { useState } from 'react';

const Tabs = ({ singleProduct, setSingleProduct }) => {
    const [activeTab, setActiveTab] = useState("desc");

    const handleTabClick = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab)
    }
    return (
        <div className="single-tabs">
            <ul className="tab-list">
                <li>
                    <a href="#" className={`tab-button  ${activeTab === "desc" ? "active" : ""} `} onClick={(e) => handleTabClick(e, "desc")}>Description</a>
                </li>
                <li >
                    <a href="#" className={`tab-button  ${activeTab === "info" ? "active" : ""} `} onClick={(e) => handleTabClick(e, "info")}>
                        Additional information
                    </a>
                </li>
                <li>
                    <a href="#" className={`tab-button  ${activeTab === "reviews" ? "active" : ""} `} onClick={(e) => handleTabClick(e, "reviews")} >
                        Reviews
                    </a>
                </li>
            </ul>
            <div className="tab-panel">
                <div className={`tab-panel-descriptions content  ${activeTab === "desc" ? "active" : ""} `} id="desc">
                    <span dangerouslySetInnerHTML={{ __html: singleProduct.description }}></span>
                </div>
                <div className={`tab-panel-information content  ${activeTab === "info" ? "active" : ""} `} id="info">
                    <h3>Additional information</h3>
                    <table>
                        <tbody>
                            <tr>
                                <th>Color</th>
                                <td>
                                    <p>
                                        Apple Red, Bio Blue, Sweet Orange, Blue, Green, Pink, Black, White</p>
                                </td>
                            </tr>
                            <tr>
                                <th>Size</th>
                                <td>
                                    <div className="flex">
                                        {singleProduct.sizes.map((size, index) => (
                                            <p key={index}>
                                                {size.toUpperCase()}
                                                {index < singleProduct.sizes.length - 1 && ", "}
                                            </p>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Reviews singleProduct={singleProduct} setSingleProduct={setSingleProduct} active={activeTab === "reviews" ? "content active" : "content"} />
            </div>
        </div>
    )
}

export default Tabs