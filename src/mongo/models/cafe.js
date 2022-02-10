const logger = require('../../utils/logger/index')
const MDB = require('../client').MDB;
const dbName = config.mongo.db;
const collection = 'cafes';

/**
 * Create a new cafe in the database
 * @param name - The name of the cafe.
 * @param phone - The phone number of the cafe.
 * @param userId - The userId of the user who created the cafe.
 * @param latitude - The latitude of the cafe.
 * @param longitude - The longitude of the cafe.
 * @param city - The city where the cafe is located.
 * @param state - The state of the cafe.
 * @param country - The country where the cafe is located.
 * @param street - The street address of the cafe.
 * @param zipCode - The zip code of the cafe.
 */

async function createNewCafe(name, phone, userId, latitude, longitude, city, state, country, street, zipCode) {

    if (!name || !phone || !userId || !latitude || !longitude || !city || !state || !country || !street || !zipCode) {
        throw "Required parameters missing - create cafe.";
    }

    let cafe = {
        name,
        phone,
        userId,
        latitude,
        longitude,
        address: {

            city: city,
            state: state,
            country: country,
            street: street,
            zipCode: zipCode

        },
        rating: 0,
        totalRatings: 0
    }
    let client;

    try {

        client = await MDB.getClient();
        let db = client.db(dbName).collection(collection);

        let startTime = Date.now();


        let response = await db.insertOne(cafe);

        let endTime = Date.now();

        let timeTaken = endTime - startTime;

        logger.info("create cafe mongo response time: " + timeTaken.toString());

        return response.insertedId;

    } catch (e) {
        throw e;
    }
}



/**
 * It finds a cafe by its id.
 * @param cafeId - The id of the cafe to find.
 * @returns The response is a single document.
 */

async function getCafeById(cafeId) {
    if (!cafeId) throw "Cafe Id is required to find cafe";

    let client;

    try {

        client = await MDB.getClient();
        let db = client.db(dbName).collection(collection);

        let startTime = Date.now();


        let response = await db.findOne({
            _id: cafeId
        });

        let endTime = Date.now();

        let timeTaken = endTime - startTime;

        logger.info("getCafeById mongo response time: " + timeTaken.toString());

        return response;

    } catch (e) {
        throw e;
    }

}


/**
 * Update the cafe information in the database
 * @param cafeId - The id of the cafe to update.
 * @param phone - The phone number of the cafe.
 * @param latitude - latitude of the cafe
 * @param longitude - The longitude of the cafe.
 * @param city - The city where the cafe is located
 * @param state - The state of the cafe
 * @param country - The country of the cafe.
 * @param street - The street address of the cafe
 * @param zipCode - The zip code of the cafe
 * @param name - The name of the cafe
 */

async function updateCafeInformation(cafeId, phone, latitude, longitude, city, state, country, street, zipCode, name) {
    if (!cafeId) throw "Cafe Id is required to find cafe";
    let updateQuery = {};

    /*
    Updates not related to address
    */
    if (name) updateQuery.name = name;

    if (phone) updateQuery.phone = phone;

    if (latitude) updateQuery.latitude = latitude;

    if (longitude) updateQuery.longitude = longitude;

    /*
    Address related updates
    */

    if (city) updateQuery.address.city = city;

    if (state) updateQuery.address.state = state;

    if (country) updateQuery.address.country = country;

    if (street) updateQuery.address.street = street;

    if (zipCode) updateQuery.address.zipCode = zipCode;

    let client;

    try {

        client = await MDB.getClient();
        let db = client.db(dbName).collection(collection);

        let startTime = Date.now();


        let response = await db.updateOne({
            _id: cafeId
        }, {
            $set: updateQuery
        });

        let endTime = Date.now();

        let timeTaken = endTime - startTime;

        logger.info("updateCafeInformation mongo response time: " + timeTaken.toString());

        return response;

    } catch (e) {
        throw e;
    }

}


/**
 * It queries the database and returns the results.
 * @param [limit=15] - The number of documents to return.
 * @param [skip=0] - The number of documents to skip.
 */

async function getCafes(limit = 15, skip = 0) {
    let client;

    try {

        client = await MDB.getClient();
        let db = client.db(dbName).collection(collection);

        let startTime = Date.now();

        let cafes = []
        let response = await db.find({

        }).limit(limit).skip(skip).forEach((x) => {
            cafes.push(x);
        });

        let endTime = Date.now();

        let timeTaken = endTime - startTime;

        logger.info("getCafes mongo response time: " + timeTaken.toString());

        return response;

    } catch (e) {
        throw e;
    }

}

module.exports = {
    getCafeById,
    getCafes,
    updateCafeInformation,
    createNewCafe
}