const logger = require('../../utils/logger/index')
const MDB = require('../client').MDB;
const dbName = config.mongo.db;
const collection = 'bills';


async function generateNewBill(userId, cafeId) {

    if (!userId || !cafeId) {
        throw "Required parameters not present."
    }

    let bill = {
        userId,
        cafeId,
        status: "PENDING"
    }

    let client;

    try {

        client = await MDB.getClient();
        let db = client.db(dbName).collection(collection);

        let startTime = Date.now();


        let response = await db.insertOne(bill);

        let endTime = Date.now();

        let timeTaken = endTime - startTime;

        logger.info("generateNewBill mongo response time: " + timeTaken.toString());

        return response;

    } catch (e) {
        throw e;
    }
}

async function addItemToBill(billId, price, quantity, itemId) {

    if (!billId || !price || !quantity || !itemId) {
        throw "Required parameters not provided"
    }

    let updateItem = {
        itemId: itemId,
        price: price

    }

    let client;

    try {

        client = await MDB.getClient();
        let db = client.db(dbName).collection(collection);

        let startTime = Date.now();


        let response = await db.insertOne(bill);

        let endTime = Date.now();

        let timeTaken = endTime - startTime;

        logger.info("generateNewBill mongo response time: " + timeTaken.toString());

        return response;

    } catch (e) {
        throw e;
    }
}


async function markBillPaid(mode) {


    if (!mode) throw "Mode should be mentioned"

    let client;

    try {

        client = await MDB.getClient();
        let db = client.db(dbName).collection(collection);

        let startTime = Date.now();


        let response = await db.insertOne(bill);

        let endTime = Date.now();

        let timeTaken = endTime - startTime;

        logger.info("markBillPaid mongo response time: " + timeTaken.toString());

        return response;

    } catch (e) {
        throw e;
    }
}