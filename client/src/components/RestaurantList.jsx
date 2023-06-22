import React, { useContext, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder.js";
import { RestaurantsContext } from "../context/RestaurantsContext.js";

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurants);
      } catch (err) {}
    };

    fetchData();
  }, []);

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
          <tr>
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
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
