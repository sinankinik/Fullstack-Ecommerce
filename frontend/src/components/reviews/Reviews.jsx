import React, { useEffect, useState } from 'react'
import "./reviews.css"
import ReviewForm from './ReviewForm'
import ReviewItem from './ReviewItem'
import PropTypes from "prop-types"
import { message } from 'antd'

const Reviews = ({ active, singleProduct, setSingleProduct }) => {
    const [users, setUsers] = useState([]);
    const thisReview = [];
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/users`);

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    message.error("Veri getirme başarısız.");
                }
            } catch (error) {
                console.log("Giriş hatası:", error);
            }
        };
        fetchUsers();
    }, [apiUrl])

    singleProduct.reviews.forEach((review) => {
        const matchingUsers = users?.filter((user) => user._id === review.user)
        matchingUsers.forEach((matchingUser) => {
            thisReview.push(({
                review: review,
                user: matchingUser,
            }))
        })
    });

    return (
        <div className={`tab-panel-reviews  ${active}`}>
            <div className="comments">
                {singleProduct.reviews.length > 0 ? <div>
                    <h3>{singleProduct.reviews.length} reviews for {singleProduct.name}</h3>
                    <ol className="comment-list">
                        {thisReview.map((item, index) => (
                            <ReviewItem item={item} reviewItem={item} key={index} />
                        ))}

                    </ol></div> :
                    <div><h3>Hiç Yorum Yok</h3></div>
                }
            </div>
            <div className="review-form-wrapper">
                <h2>Add a review</h2>
                <ReviewForm singleProduct={singleProduct} setSingleProduct={setSingleProduct} />
            </div>
        </div>
    )
}

export default Reviews;
Reviews.propTypes = {
    active: PropTypes.string
}