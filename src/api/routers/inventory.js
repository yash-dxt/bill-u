const DatabaseError = require("../../errors/DatabaseError");

module.exports = function inventoryRouter() {

    return new express.Router()
        .get('/', getItem)
        .get('/all', getInventory)
        .post('/', addItemToInventory)
        .put('/', updateItem)
        .delete('/', deleteItemFromInventory)

    async function getItem(req, res) {
        const routeName = 'getItem';
        try {

        } catch (e) {
            throw new DatabaseError(routeName, e)
        }
    }
    async function getInventory(req, res) {
        const routeName = 'getInventory';

        try {} catch (e) {
            throw new DatabaseError(routeName, e)
        }
    }
    async function addItemToInventory(req, res) {
        const routeName = 'addItemToInventory';

        try {} catch (e) {
            throw new DatabaseError(routeName, e)
        }
    }
    async function updateItem(req, res) {
        const routeName = 'updateItem';

        try {} catch (e) {
            throw new DatabaseError(routeName, e)
        }
    }
    async function deleteItemFromInventory(req, res) {
        const routeName = 'deleteItemFromInventory';

        try {} catch (e) {
            throw new DatabaseError(routeName, e)
        }
    }




}