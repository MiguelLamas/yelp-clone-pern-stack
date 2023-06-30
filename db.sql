-- for help     \?

-- list database        \l

-- Create database      CREATE DATABASE database_name

-- Connect to database      \c database_name

-- List all tables      \d

-- List details of specific table       \d table_name

-- PRACTICE SCHEMA
CREATE TABLE products (
    id INT,
    name VARCHAR(255),
    price INT,
    on_sale boolean
);

-- ADD TABLE
ALTER TABLE products ADD COLUMN featured boolean;
-- DROP TABLE
ALTER TABLE products DROP COLUMN featured;

---------------------

-- YELP DATABASE / TABLE

-- CREATE RESTAURANT TABLE
CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);

-- INSERT INTO TABLE
INSERT INTO restaurants (id, name, location, price_range) values (123, 'McDonalds', 'New York', 3);

-- CREATE TABLE REVIEWS
CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >=1 and rating <=5)
);

-- INSERT INTO REVIEWS
INSERT INTO reviews (restaurant_id, name, review, rating) values (9, 'Eric', 'Restaurant was splendid', 4);