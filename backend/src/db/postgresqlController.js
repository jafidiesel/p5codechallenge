var pgp = require('pg-promise')(/* options */);

let username = process.env.db_username;
let password = process.env.db_password;
let host = process.env.db_host;
let port = process.env.db_port;
let database = process.env.db_database;

const cn = {
    host: host, // 'localhost' is the default;
    port: port, // 5432 is the default;
    database: database,
    user: username,
    password: password
};
const postgresClient = pgp(cn); // database instance;

if(postgresClient) console.log("DB up and running.");

module.exports = {
    postgresClient
}