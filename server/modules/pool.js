const pg = require('pg');

// module to set up PG

const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
};

const pool = new pg.Pool(config);

pool.on("connect", () => {
    console.log("connected to postgres");
})

pool.on("error", (err) => {
    console.log("ERROR connected to postgres");
})

// alow pg to be used if declared on another js file
module.exports = pool;
