import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReviews from "../components/AddReviews";

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        // we want to access both restaurant and reviews from response.data.data,
        //  rather than just restaurant with response.data.data.restaurant
        setSelectedRestaurant(response.data.data);
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();
  }, []);

  return <div>{selectedRestaurant && (
    <>
    <h1 className="text-center display-1 mt-5">{selectedRestaurant.restaurant.name}</h1>
      <div className="mt-3">
        <Reviews reviews={selectedRestaurant.reviews} />
      </div>
      <AddReviews />
    </>
  )}</div>;
};

export default RestaurantDetailsPage;
