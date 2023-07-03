import React, { useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useParams } from "react-router-dom";

const AddReviews = () => {
  const { id } = useParams();
 

  const [name, setName] = useState("");
  const [rating, setRating] = useState("Rating");
  const [reviewText, setReviewText] = useState("");

  const handleSubmitReview = async (e) => {
    // prevent page from reloading
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post(`/${id}/addReview`, {
        name: name,
        review: reviewText,
        rating: rating,
      });
      window.location.reload() ;
    } catch (err) {}
  };

  return (
    <form className="row g-3">
      <div className="col-md-7 mt-4">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="form-control"
          id="name"
        />
      </div>
      <div className="col-md-5 mt-4">
        <label htmlFor="rating" className="form-label">
          Rating
        </label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          id="rating"
          className="form-select"
        >
          <option disabled>Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="col-12">
        <label htmlFor="reviewtext" className="form-label">
          Review
        </label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          id="Review"
          className="form-control"
        ></textarea>
      </div>
      <div className="col-12">
        <button
          onClick={handleSubmitReview}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddReviews;
