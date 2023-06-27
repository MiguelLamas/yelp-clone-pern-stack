import React from 'react';
import { useParams } from "react-router-dom";

const UpdateRestaurant = (props) => {
    const {id} = useParams(); 
  
  return (
    <div>
    <form action="">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input id="name" className="form-control" type="text" />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input id="location" className="form-control" type="text" />
      </div>

      <div className="form-group">
        <label htmlFor="price_range">Price Range</label>
        <input id="price_range" className="form-select" type="number" />
      </div>
    </form>
   
    </div>
  )
}

export default UpdateRestaurant