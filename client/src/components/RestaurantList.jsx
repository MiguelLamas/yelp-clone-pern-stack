import React, { useContext, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder.js";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  let navigate = useNavigate(); // useNavigate function to navigate to specific url as stated in handle functions below.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        console.log(response.data.data);
        setRestaurants(response.data.data.restaurants);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    // e.stopPropagation means when we click Update button we are not going to send that Event up to the Table row.
    // it doesnt hit the useNavigate function.
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
    } catch (err) {}
  };

  const handleUpdate = (e, id) => {
    // e.stopPropagation means when we click Update button we are not going to send that Event up to the Table row.
    // it doesnt hit the useNavigate function.
    e.stopPropagation();

    // tell react router to navigate to url "localhost:3000/restaurants/id/update"
    navigate(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning ml-1">0 reviews</span>
    }
    return (
      <>
        <StarRating rating={restaurant.id} />
        <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    );
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark align-middle justify-content-center">
        <thead>
          <tr>
            <th className="bg-primary" scope="col">
              Restaurant
            </th>
            <th className="bg-primary" scope="col">
              Location
            </th>
            <th className="bg-primary" scope="col">
              Price Range
            </th>
            <th className="bg-primary" scope="col">
              Ratings
            </th>
            <th className="bg-primary" scope="col">
              Edit
            </th>
            <th className="bg-primary" scope="col">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr
                  onClick={() => handleRestaurantSelect(restaurant.id)}
                  key={restaurant.id}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>{renderRating(restaurant)}</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, restaurant.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, restaurant.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
