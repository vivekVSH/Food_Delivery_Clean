import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContex } from '../../Context/StoreContext'
import { Link } from 'react-router-dom'

const FoodItem = ({ id, name, price, description, image, rating }) => {
    const { cartItems, addToCart, removeFromCart } = useContext(StoreContex);

    // Function to render star emojis based on rating
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i}>⭐</span>);
        }
        if (hasHalfStar) {
            stars.push(<span key="half">✨</span>); // Optional for half-star
        }
        return stars;
    };

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-item-image' src={image} alt="" />
                {!cartItems[id]
                    ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='' />
                    : <div className="food-item-counter">
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <div className="stars">
                        {rating ? renderStars(rating) : <img src={assets.rating_starts} alt="rating" />}
                        {rating && <span>{rating.toFixed(1)}</span>}
                    </div>
                </div>
                <p className="food-item-dess">{description}</p>
                <p className="food-item-price">₹{price}</p>

                {/* ✅ View Button */}
                <Link to={`/food/${id}`}>
                    <button className="view-button">View</button>
                </Link>
            </div>
        </div>
    )
}

export default FoodItem
