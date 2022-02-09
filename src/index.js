const {
    MDB
} = require('./mongo/client');
const app = require('./app');
var config = require('../../config');
const logger = require('./utils/logger/index')
const http = require('http');

/* Create a server */


let env = config.environment;
let port = config.hosting.port || 3000;
let host = config.hosting.host || '0.0.0.0';

const server = http.createServer(app);

/*
1. Start the server and listen for incoming connections.
2. Get the MongoDB clients & connect to it.
3. Log the server is up and running. 
*/

server.listen(port, async () => {
    await MDB.getClient();
    logger.info("Server is up and running at " + host + " and port: " + port + " at Environment: " + env);
});