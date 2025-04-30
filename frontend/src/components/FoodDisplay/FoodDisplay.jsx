import React, { useState, useEffect } from 'react';
import './FoodDisplay.css';
import { food_list as originalFoodList } from '../../assets/assets'; // renamed to avoid confusion
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    const storedFoodList = JSON.parse(localStorage.getItem('food_list')) || originalFoodList;
    setFoodList(storedFoodList);
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`}>⭐</span>);
    }

    if (halfStar) {
      stars.push(<span key="half">✨</span>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`}>☆</span>);
    }

    return stars;
  };

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes Near You.</h2>
      <div className="food-display-list">
        {foodList.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <div key={index} className="food-item">
                <FoodItem 
                  id={item._id} 
                  name={item.name} 
                  price={item.price} 
                  description={item.description} 
                  image={item.image} 
                  rating={item.rating} 
                />
                {/* Rating and Review below Food Item */}
                <div className="food-rating">
                  {renderStars(item.rating)}
                  <p>{item.review ? item.review : "No reviews yet."}</p>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
