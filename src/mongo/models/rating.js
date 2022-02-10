const logger = require('../../utils/logger/index')
const MDB = require('../client').MDB;
const dbName = config.mongo.db;
const collection = 'ratings';



/**
 * This function is used to add a rating to a cafe.
 * @param userId - The user id of the user who is rating the cafe.
 * @param cafeId - The id of the cafe that the user is rating.
 * @param rating - The rating provided by the user.
 * @param comment - Comment provided by the user.
 */

async function addRatingTransaction(userId, cafeId, rating, comment) {

    /*
    Validate required parameters.
    */


    if (!userId || !cafeId) {
        throw "User Id and Cafe Id required for updating"
    }

    let rateObj = {
        userId,
        cafeId
    }

    /*  
    Validate ratings & assign if they are correct.
    */

    if (!rating || typeof (rating) != Number) throw "Rating provided isn't valid";

    if (rating < 0 && rating > 5) throw "Rating range is between 0 and 5"


    rateObj.rating = rating;

    if (comment) {
        rateObj.comment = comment;
    }

    let client;

    try {

        client = await MDB.getClient();

        let ratingsCollection = client.db(dbName).collection(collection);
        let cafeCollection = client.db(dbName).collection('cafes');

        let startTime = Date.now();

        const session = client.startSession();

        const transactionOptions = {
            readPreference: 'primary',
            readConcern: {
                level: 'local'
            },
            writeConcern: {
                w: 'majority'
            }
        }


        var res = await session.withTransaction(async () => {

            try {

                var res1 = await ratingsCollection.insertOne(rateObj, {
                    session: session
                });


            } catch (e) {

                await session.abortTransaction();
                logger.error("Transaction error in onboarding update - 1");
                throw e;
            }

            if (!res1.insertedId) {
                await session.abortTransaction();
                throw "Transaction error";
            }

            try {

                var getPresentRating = await cafeCollection.findOne({
                    _id: cafeId
                }, {
                    projection: {
                        rating: 1,
                        totalRatings: 1
                    }
                }, {
                    session: session
                })
            } catch (e) {

                await session.abortTransaction();
                logger.error("Transaction error in onboarding update - 2");
                throw e;
            }


            if (!getPresentRating._id) {
                await session.abortTransaction();
                throw "Transaction error";
            }

            let finalRating = (getPresentRating.rating + rating) / (getPresentRating.totalRatings + 1);

            try {

                var updateCafeRating = await cafeCollection.updateOne({
                    _id: cafeId
                }, {
                    $set: {
                        rating: finalRating
                    },
                    $inc: {
                        totalRatings: 1
                    }
                }, {
                    session: session
                })
            } catch (e) {

                await session.abortTransaction();
                logger.error("Transaction error in onboarding update - 2");
                throw e;
            }

            if (!updateCafeRating.modifiedCount) {
                await session.abortTransaction();
                throw "Transaction failed"
            }

        }, transactionOptions);

        let endTime = Date.now();

        let timeTaken = endTime - startTime;

        logger.info("onboardingUpdate update mongo response time: " + timeTaken.toString());



        return res;

    } catch (e) {

        throw e;

    }
}