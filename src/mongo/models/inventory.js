const logger = require('../../utils/logger/index')
const MDB = require('../client').MDB;
const dbName = config.mongo.db;
const collection = 'inventory';

/**
 * It adds a new item to the inventory collection.
 * @param cafeId - The id of the cafe where the item is being added.
 * @param price - The price of the item
 * @param quantity - The number of items in the inventory.
 * @param photo - The photo of the item.
 * @param name - The name of the item
 */


async function addNewInventoryItem(cafeId, price, quantity, photo, name) {

    if (!name || !cafeId || !price || !quantity || !photo) {
        throw "Required params missing in addInventoryItem"
    }

    let inventoryItem = {
        name,
        cafeId,
        price,
        quantity,
        photo
    }

    let client;

    try {

        client = await MDB.getClient();
        let db = client.db(dbName).collection(collection);

        let startTime = Date.now();


        let response = await db.insertOne(inventoryItem);

        let endTime = Date.now();

        let timeTaken = endTime - startTime;

        logger.info("addNewInventoryItem mongo response time: " + timeTaken.toString());

        return response;

    } catch (e) {
        throw e;
    }
}

/**
 * Update an inventory item in the database
 * @param itemId - The ID of the item to update.
 * @param price - The price of the item.
 * @param quantity - The quantity of the item in the inventory.
 * @param photo - The photo of the item.
 * @param name - The name of the item
 * @returns The response from the updateOne() method.
 */

async function updateInventoryItem(itemId, price, quantity, photo, name) {

    if (!itemId) {

        throw "Item ID is required to update inventory item"

    }

    let updateQuery = {};

    if (!price && !quantity && !photo && !name) {
        throw "Nothing to update in inventory item";
    }

    if (name) {
        updateQuery.name = name;
    }

    if (photo) {
        updateQuery.photo = photo;
    }

    if (price) {
        updateQuery.price = price;
    }

    if (quantity) {
        updateQuery.quantity = quantity;
    }

    let client;

    try {

        client = await MDB.getClient();
        let db = client.db(dbName).collection(collection);

        let startTime = Date.now();


        let response = await db.updateOne({
            _id: itemId
        }, {
            $set: updateQuery
        })

        let endTime = Date.now();

        let timeTaken = endTime - startTime;

        logger.info("update inventory item mongo response time: " + timeTaken.toString());

        return response;

    } catch (e) {
        throw e;
    }
}

/**
 * Delete an item from the inventory collection
 * @param itemId - The id of the item to delete.
 * @returns The deleteOne() method returns a DeleteResult object.
 */

async function deleteItem(itemId) {
    let client;

    try {

        client = await MDB.getClient();
        let db = client.db(dbName).collection(collection);

        let startTime = Date.now();


        let response = await db.deleteOne({
            _id: itemId
        });

        let endTime = Date.now();

        let timeTaken = endTime - startTime;

        logger.info("DELETE item from inventory mongo response time: " + timeTaken.toString());

        return response;

    } catch (e) {
        throw e;
    }
}

/**
 * Get all items from a cafe
 * @param cafeId - The id of the cafe to get the items from
 * @param [limit=10] - The number of items to return.
 * @param [skip=0] - The number of documents to skip.
 * @returns An array of items.
 */

async function getItemsFromCafe(cafeId, limit = 10, skip = 0) {
    let client;

    if (!cafeId) throw "Cafe Id is required";

    try {

        client = await MDB.getClient();
        let db = client.db(dbName).collection(collection);

        let startTime = Date.now();

        let items = [];

        await db.find({
            cafeId: cafeId
        }).limit(limit).skip(skip).forEach((x) => {
            items.push(x)
        });


        let endTime = Date.now();

        let timeTaken = endTime - startTime;

        logger.info("getItemsFromCafe mongo response time: " + timeTaken.toString());

        return items;

    } catch (e) {
        throw e;
    }
}


module.exports = {
    addNewInventoryItem,
    updateInventoryItem,
    deleteItem,
    getItemsFromCafe
}