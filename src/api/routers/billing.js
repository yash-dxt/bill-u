module.exports = function billingRouter() {

    return new express.Router()
        .get('/', getBill)
        .get('/cafe', getBillsForCafe)
        .get('/user', getBillsForUser)
        .post('/generate', generateBill)
        .put('/add', addItemToBill)
        .delete('/remove', removeItemFromBill);



}