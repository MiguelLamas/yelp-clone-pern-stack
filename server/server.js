require("dotenv").config();
const express = require("express");
const db = require("./db/index");
// import morgan from "morgan";
const app = express();

// middlewear
app.use(express.json());

// route handlers

// get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM restaurants");
    console.log(results);
    res.status(200).json({
      status: "Success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// get a specific restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "SELECT * FROM restaurants WHERE id = $1", [req.params.id]);
      
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

// Create a Restaurant
app.post("/api/v1/restaurants", (req, res) => {
  console.log(req.body);

  res.status(201).json({
    status: "Success",
    data: {
      restaurant: "Wendys",
    },
  });
});

// Update a Restaurant
app.put("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  res.status(200).json({
    status: "Success",
    data: {
      restaurant: "Wendys",
    },
  });
});

// Delete Restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  res.status(204).json({
    status: "Success",
  });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
