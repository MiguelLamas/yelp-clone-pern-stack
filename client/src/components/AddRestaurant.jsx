import React, { useContext, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder.js";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  const {addRestaurants} = useContext(RestaurantsContext);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name: name,
        location: location,
        price_range: priceRange,
      });
      addRestaurants(response.data.data.restaurant);
      console.log(response);
    } catch (err) {}
  };

  return (
    <form action="">
      <div className="row gx-4  mb-5">
        <div className="col">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control p-2"
            placeholder="Name"
          />
        </div>
        <div className="col">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            className="form-control p-2"
            placeholder="Location"
          />
        </div>
        <div className="col">
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="form-select p-2"
          >
            <option disabled>Price Range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <div className="col">
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary px-3 py-2"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddRestaurant;
