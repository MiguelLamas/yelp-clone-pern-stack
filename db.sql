-- for help     \?

-- list database        \l

-- Create database      CREATE DATABASE database_name

-- Connect to database      \c database_name

-- List all tables      \d

-- List details of specific table       \d table_name

-- TEMPLATE

CREATE TABLE products (
    id INT,
    name VARCHAR(255),
    price INT,
    on_sale boolean
);