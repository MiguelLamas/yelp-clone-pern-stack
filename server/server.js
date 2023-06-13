require('dotenv').config()
const express = require("express");

const app = express();

// Get all Restaurants
app.get("/api/v1/restaurants", (req, res) => {
    res.status(200).json({
        status: "Success",
        data: {
            restaurant: ["McDonalds", "Wendys"],
        },
    });
});

// Get a Restaurants
app.get("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.params)
})

// Create a restaurant


const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`)
});