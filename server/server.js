require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db/index");
// import morgan from "morgan";
const app = express();

// middlewear
app.use(cors());
app.use(express.json());

// route handlers

// get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    // const results = await db.query("SELECT * FROM restaurants");
    const restaurantRatingsData = await db.query(`SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), 
    TRUNC(AVG(rating),1) as average_rating from reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id;`
    )

    res.status(200).json({
      status: "Success",
      results: restaurantRatingsData.rows.length,
      data: {
        restaurants: restaurantRatingsData.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// get a specific restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await db.query(
      `SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), 
    TRUNC(AVG(rating),1) as average_rating from reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1;`,
      [req.params.id]
    );

    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1",
      [req.params.id]
    );

    res.status(200).json({
      status: "Success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    console.log(results);
    res.status(201).json({
      status: "Success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(200).json({
      status: "Success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// delete restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants WHERE id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "Success",
    });
  } catch (err) {
    console.log(err);
  }
});

// add review
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) RETURNING *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    res.status(201).json({
      status: "Success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
