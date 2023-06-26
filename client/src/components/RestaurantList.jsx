import React, { useContext, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder.js";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useNavigate } from "react-router-dom";

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  let navigate = useNavigate() // history object represents history of our browser
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurants);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
    } catch (err) {}
  };

  const handleUpdate = (id) => {
  // tell react router to navigate to url "localhost:3000/restaurants/id/update" Adding url into History Stack with history.push()
      navigate(`/restaurants/${id}/update`);
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
                <tr key={restaurant.id}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>Reviews</td>
                  <td>
                    <button onClick={() => handleUpdate(restaurant.id)}
                    className="btn btn-warning">Update</button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(restaurant.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}

          {/* <tr>
            <td className="mr-4">McDonalds</td>
            <td>New York</td>
            <td>$$</td>
            <td>Rating</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
          <tr>
            <td>McDonalds</td>
            <td>New York</td>
            <td>$$</td>
            <td>Rating</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
