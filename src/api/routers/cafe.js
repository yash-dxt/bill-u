const mongo = require('../../mongo');
const MissingParamError = require('../../errors/MissingParamError');
const NotAuthenticatedError = require('../../errors/NotAuthenticatedError');
const DatabaseError = require('../../errors/DatabaseError');


module.exports = function cafeRouter() {

    return new express.Router()
        .get('/', getCafe)
        .get('/all', getAllCafes)
        .post('/', newCafe)
        .put('/', updateCafe);

    async function getCafe(req, res) {
        let routeName = 'get cafe';
        let {
            cafeId
        } = req.query;

        try {
            var cafe = await mongo.cafe.getCafeById(cafeId);
        } catch (e) {
            throw new DatabaseError(routeName, e);
        }

        res.status(201).send({
            message: 'found',
            cafe
        })
    }
    async function getAllCafes(req, res) {
        let routeName = 'get all cafes';
        let {
            limit,
            skip
        } = req.body;

        try {
            var cafes = mongo.cafe.getCafes(limit, skip);
        } catch (e) {
            throw new DatabaseError(routeName, e)
        }

        return res.status(200).send({
            message: 'found',
            cafes
        })


    }
    async function newCafe(req, res) {
        let routeName = 'create new cafe';

        let {
            userId
        } = req.query;
        let {
            phone,
            name,
            latitude,
            longitude,
            zipCode,
            city,
            country,
            state,
            street
        } = req.body;

        if (!userId || !phone || !name || !latitude || !longitude || !zipCode || !city || !country || !state || !street) {
            throw new MissingParamError('Missing params which are required.', routeName)
        }


        try {
            var cafeId = await mongo.cafe.createNewCafe(name, phone, userId, latitude, longitude, city, state, country, street, zipCode);
        } catch (e) {
            throw new DatabaseError(routeName, e);
        }

        return res.status(201).send({
            message: 'created',
            cafeId
        })


    }
    async function updateCafe(req, res) {
        let routeName = 'update cafe';
        let {
            cafeId
        } = req.query;

        let {
            phone,
            name,
            latitude,
            longitude,
            zipCode,
            city,
            country,
            state,
            street
        } = req.body;

        try {
            await mongo.cafe.updateCafeInformation(cafeId, phone, latitude, longitude, city, state, country, street, zipCode, name);
        } catch (e) {
            throw new DatabaseError(routeName, e)
        }

        res.status(200).send({
            message: 'updated'
        })

    }


}