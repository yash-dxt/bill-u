var config = require('../../../config');
const MongoClient = require('mongodb').MongoClient;
const mongodbUri = config.mongo.uri;
const logger = require('../utils/logger/index')


/*

The MDB class is a singleton class that is used to connect to the MongoDB database. The getClient()
method is used to get the MongoDB client. The client is cached so that it is only created once.

The MongoClient.connect() method is used to connect to the MongoDB database. The
MongoClient.connect() method returns a promise. The promise is resolved with the MongoClient object.

*/
class MDB {

    static async getClient() {
        if (this.client) {
            return this.client
        }
        logger.info("Cache miss - Connecting to MongoDB client now.")

        let startTime = Date.now();

        this.client = await MongoClient.connect(this.url);

        logger.info("Mongo Client time taken: " + (Date.now() - startTime).toString() + "ms");

        return this.client
    }

}


MDB.url = mongodbUri;

module.exports = {
    MDB
}