import React from "react";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i class="fa-solid fa-star"></i>);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<i class="fa-regular fa-star-half-stroke"></i>);
    } else {
      stars.push(<i class="fa-regular fa-star"></i>);
    }
  }
  return <>{stars}</>;
};

export default StarRating;
