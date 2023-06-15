require("dotenv").config();
const express = require("express");
const db = require("./db/index");
// import morgan from "morgan";
const app = express();

// MIDDLEWEAR - HAS TO BE TOLD TO PASS ON REQUEST TO 'NEXT' PIECE OF MIDDLEWEAR/or ROUTE HANDLER LIKE BELOW
// WE DO THAT PASSING IN A THIRD ARGUEMENT CALLED A 'NEXT' FUNCTION WHICH TELLS THE MIDDLEWEAR TO PASS ON THE REQUEST
// TO THE NEXT MIDDLEWEAR/or ROUTE HANDLER.

// app.use(morgan("dev"));

// app.use((req, res, next) => {
//     console.log('Middlewear is running');
//     next();
//     })

// MIDDLEWARE
app.use(express.json());


// ROUTE HANDLERS

// Get all Restaurants
app.get("/api/v1/restaurants", async (req, res) => {

    const results = await db.query("SELECT * FROM restaurants");
    console.log("Route Handler is Running")
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

    res.status(200).json({
        status: "Success", 
        data: {
        restaurant: "McDonalds"
        },
    })
})

// Create a Restaurant
app.post("/api/v1/restaurants", (req, res) => {
    console.log(req.body);

    res.status(201).json({
        status: "Success", 
        data: {
        restaurant: "Wendys",
        },
    })

})


// Update a Restaurant
app.put("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body);

    res.status(200).json({
        status: "Success", 
        data: {
        restaurant: "Wendys",
        },
    })
})

// Delete Restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    
    res.status(204).json({
        status: "Success", 
    })
})


const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`)
});