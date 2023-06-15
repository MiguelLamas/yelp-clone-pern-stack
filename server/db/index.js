// importing and destructuring Pool from pg;
const { Pool } = require("pg");
 
// using Pool to connect with our Postgres DB;
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});
 
// exporting query function;
module.exports = {
    query: (text, params) => pool.query(text, params),

}