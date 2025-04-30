import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContex } from '../../Context/StoreContext'; // ✅ import StoreContext
import { food_list } from '../../assets/assets';
import './FoodDetail.css';

const FoodDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(StoreContex); // ✅ get addToCart from context

  const [item, setItem] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [customIngredient, setCustomIngredient] = useState('');
  const [isPreparing, setIsPreparing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // ✅ success message state

  useEffect(() => {
    const storedFoodList = JSON.parse(localStorage.getItem('food_list')) || food_list;
    const foundItem = storedFoodList.find(food => String(food._id) === String(id));
    if (foundItem) {
      setItem(foundItem);
      // Initialize selectedIngredients with the current food item's ingredients
      if (foundItem.ingredients && foundItem.ingredients.length > 0) {
        setSelectedIngredients([...foundItem.ingredients]);
      }
      console.log("Found item with ingredients:", foundItem.ingredients); // Debug log
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleSubmit = () => {
    const storedFoodList = JSON.parse(localStorage.getItem('food_list')) || food_list;
    const updatedFoodList = storedFoodList.map(food => {
      if (String(food._id) === String(id)) {
        return { ...food, rating: rating, review: review };
      }
      return food;
    });

    localStorage.setItem('food_list', JSON.stringify(updatedFoodList));
    alert(`Submitted Rating: ${rating} stars\nReview: ${review}`);
    setRating(0);
    setReview('');
    setItem(updatedFoodList.find(food => String(food._id) === String(id)));
  };

  const handleIngredientChange = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(prev => prev.filter(item => item !== ingredient));
    } else {
      setSelectedIngredients(prev => [...prev, ingredient]);
    }
  };

  const handleMakeMyFood = () => {
    let finalIngredients = [...selectedIngredients];
    if (customIngredient.trim() !== '') {
      finalIngredients.push(customIngredient.trim());
    }

    console.log('Making food with ingredients:', finalIngredients); // Debug log

    setIsPreparing(true);
    setTimeout(() => {
      setIsPreparing(false);
      setShowCustomizeModal(false);
      setCustomIngredient('');
      // Don't reset selectedIngredients here to maintain user's selections

      console.log('Final customized ingredients:', finalIngredients);

      // ✅ Add item to cart after customization
      addToCart(item._id);

      // ✅ Show success message after adding to cart
      setShowSuccessMessage(true);

      // ✅ Hide message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      alert('Your customized food has been added to cart! 🛒');
    }, 3000);
  };

  if (!item) return null;

  return (
    <div className="food-detail">
      {/* ✅ Success Popup */}
      {showSuccessMessage && (
        <div className="success-message">
          🛒 Food added to cart successfully!
        </div>
      )}

      <img src={item.image} alt={item.name} className="food-image" />
      <div className="food-info">
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <p>Price: ₹{item.price}</p>

        {/* Review Section */}
        <h4>Leave a Review</h4>
        <div className="star-rating">
          {[...Array(5)].map((_, index) => {
            const currentRating = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onClick={() => setRating(currentRating)}
                />
                <i
                  className="star"
                  style={{
                    color: currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                  }}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(rating)}
                >
                  ★
                </i>
              </label>
            );
          })}
        </div>

        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
        />

        {/* ✨ Added a wrapper to separate buttons with gap */}
        <div className="food-detail-buttons">
          <button className="submit-btn" onClick={handleSubmit}>Submit</button>
          <button onClick={() => setShowCustomizeModal(true)} className="customize-btn">
            Customize My Food
          </button>
        </div>
      </div>

      {/* Customize Modal */}
      {showCustomizeModal && (
        <div className="modal-overlay">
          <div className="modal">
            {isPreparing ? (
              <div className="preparing-animation">
                <div className="spinner"></div>
                <p>Preparing your food... 🍳</p>
              </div>
            ) : (
              <>
                <h3>Customize Your Food</h3>
                {/* Force ingredients to be displayed even if item.ingredients check fails */}
                <div className="ingredients-list">
                  {/* Show the food_list ingredients for this specific item */}
                  {food_list.find(food => String(food._id) === String(id))?.ingredients?.map((ingredient, idx) => (
                    <label
                      key={idx}
                      className={`ingredient-item ${selectedIngredients.includes(ingredient) ? 'selected' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedIngredients.includes(ingredient)}
                        onChange={() => handleIngredientChange(ingredient)}
                      />
                      <span className="checkmark"></span> {ingredient}
                    </label>
                  ))}
                  
                  {/* Custom Ingredient Text Input */}
                  <div className="custom-ingredient-input">
                    <input
                      type="text"
                      placeholder="Other customization..."
                      value={customIngredient}
                      onChange={(e) => setCustomIngredient(e.target.value)}
                    />
                  </div>
                </div>

                <button onClick={handleMakeMyFood} className="make-food-btn">
                  Make My Food
                </button>
                <button onClick={() => setShowCustomizeModal(false)} className="close-btn">
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetail;