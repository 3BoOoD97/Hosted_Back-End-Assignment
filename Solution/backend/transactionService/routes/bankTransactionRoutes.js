const express = require('express'); 
const router = express.Router(); // Create a new router object
const bankTransactionController = require('../controllers/bankTransactionController');

// Use the router to define routes on the app
router.post('/addTransaction', bankTransactionController.createTransaction);
router.get('/getTransactions/:customerID', bankTransactionController.getTransactions);

module.exports = router;