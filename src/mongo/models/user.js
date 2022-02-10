const logger = require('../../utils/logger/index')
const MDB = require('../client').MDB;
const dbName = config.mongo.db;
const collection = 'users';



/**
 * Create a new user in the database
 * @param name - The name of the user.
 * @param email - The email address of the user.
 * @param phone - The phone number of the user.
 * @param password - The password for the user.
 * @returns The inserted id from the insertOne() method.
 */


async function createUser(name, email, phone, password) {

    if (!name || !email || !phone || !password) {
        throw "name, email, phone and password are required"
    }

    let user = {
        name,
        email,
        password,
        phone
    }

    let client;

    try {

        client = await MDB.getClient();
        let db = client.db(dbName).collection(collection);

        let startTime = Date.now();


        let response = await db.insertOne(user);

        let endTime = Date.now();

        let timeTaken = endTime - startTime;

        logger.info("createUser mongo response time: " + timeTaken.toString());

        return response.insertedId;

    } catch (e) {
        throw e;
    }
}

/**
 * Get a user by phone number
 * @param phone - The phone number of the user you want to get.
 */

async function getUserUsingPhone(phone) {

    if (!phone) {
        throw "Phone is required to get user";
    }


    let client;

    try {

        client = await MDB.getClient();
        let db = client.db(dbName).collection(collection);

        let startTime = Date.now();


        let response = await db.findOne({
            phone: phone
        });

        let endTime = Date.now();

        let timeTaken = endTime - startTime;

        logger.info("get user by phone mongo response time: " + timeTaken.toString());

        return response;

    } catch (e) {
        throw e;
    }
}


module.exports = {
    createUser,
    getUserUsingPhone
}