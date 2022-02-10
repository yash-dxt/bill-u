const mongo = require('../../mongo');
const {
    Password
} = require('../../utils/password');
const MissingParamError = require('../../errors/MissingParamError');
const NotAuthenticatedError = require('../../errors/NotAuthenticatedError');
const DatabaseError = require('../../errors/DatabaseError');


module.exports = function onboardingRouter() {

    return new express.Router()
        .post('/login', login)
        .post('/signup', signup)


    /**
     * It authenticates a user.
     * @param req - The request object.
     * @param res - the response object
     * @returns The user object is being returned.
     */

    async function login(req, res) {

        const routeName = 'login'
        let {
            phone,
            password
        } = req.body;


        if (!phone) throw new MissingParamError('Phone number is a required field', routeName)

        let user = await mongo.users.getUserUsingPhone(phone);

        let checkPassword = await Password.compare(password, user.password);

        if (!checkPassword) throw new NotAuthenticatedError('Bad credentials', routeName);

        delete user.password;

        return res.status(200).send({
            message: 'authenticated',
            user
        })

    }

    /**
     * It creates a new user in the database.
     * @param req - The request object.
     * @param res - The response object.
     */

    async function signup(req, res) {
        let routeName = 'signup'
        let {
            name,
            phone,
            email,
            password
        } = req.body;

        if (!name || !phone || !email || !password) {
            throw new MissingParamError('Required params missing', routeName);
        }


        let hashedPassword = await Password.hash(password);

        try {
            var res = await mongo.users.createUser(name, email, phone, hashedPassword);
        } catch (e) {
            throw new DatabaseError(routeName, e);
        }

        return res.status(201).send({
            message: 'created',
            userId: res
        })

    }

}