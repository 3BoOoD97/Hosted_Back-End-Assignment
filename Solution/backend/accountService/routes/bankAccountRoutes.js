const express = require('express'); 
const router = express.Router(); // Create a new router object
const bankAccountController = require('../controllers/bankAccountController');

// Use the router to define routes on the app
router.post('/account/createAccount', bankAccountController.createAccount);
router.get('/account/getAccount/:customerID', bankAccountController.getAccount);
router.post('/account/addTransactions/:customerID', bankAccountController.addTransactionsToAccount);


module.exports = router;