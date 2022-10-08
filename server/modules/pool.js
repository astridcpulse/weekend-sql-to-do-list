const pg = require('pg');
const config = {
    database: 'to_do_list',
    host: 'localhost',
    port: 5432,
 };
const pool = new pg.Pool(config);
pool.on("connect", () => {
    console.log("conected to postgres");
});
pool.on("error", (err) => {
    console.log("error connecting to postgres", err);
});
module.exports = pool;