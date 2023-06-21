import React from "react";

const AddRestaurant = () => {
  return (
   <form action="">
    <div className="row gx-4  mb-5">
      <div className="col">
        <input type="text" className="form-control p-2" placeholder="Name" />
      </div>
      <div className="col">
        <input type="text" className="form-control p-2" placeholder="Location" />
      </div>
      <div className="col">
      <select className="form-control custom-select p-2">
                <option disabled selected>Price Range (Choose...)</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
                <option value="5">$$$$$</option>
              </select>
            </div>
            <div className="col">
            <button type="submit" className="btn btn-primary px-3 py-2">
              Add
            </button>
            </div>
            
    </div>
   </form>
  );
};

export default AddRestaurant;
