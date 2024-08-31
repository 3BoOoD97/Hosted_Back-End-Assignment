// Import the BankTransactionModel that contains methods for managing transaction data
const BankTransactionModel = require('../models/bankTransactionModel');

// Create and export the createTransaction function to handle requests from the client and pass the data to the model
exports.createTransaction = async (req, res) => {
    // Extract the customerID and amount from the request body
    const { customerID, amount } = req.body;
    try {
        // Check if the amount is negative
        if (amount < 0) {
            return res.status(400).json({ message: "Amount cannot be negative." });
        }

        // Validate inputs
        if (typeof customerID !== 'string' || typeof amount !== 'number') {
            return res.status(400).json({ message: "Invalid input types." });
        }
        
        // Call the model to create a transaction
        await BankTransactionModel.createTransaction(customerID, amount);

        // Return a success response
        return res.status(200).json({
            message: 'Transaction created successfully!',
        });
    } catch (error) {
        // Log and return an error response
        console.error('Error:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Create and export the getTransactions function to handle requests from the client and pass the data to the model
exports.getTransactions = async (req, res) => {
    const { customerID } = req.params;

    // Validate input
    if (typeof customerID !== 'string') {
        return res.status(400).json({ message: "Invalid customerID type." });
    }

    try {
        const transactions = await BankTransactionModel.getTransactions(customerID);

        if (transactions.length > 0) {
            return res.status(200).json(transactions); 
        }
        return res.status(404).json({ message: 'No transactions found for this customerID.' });

    } catch (error) {
        console.error('Error retrieving transactions:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


