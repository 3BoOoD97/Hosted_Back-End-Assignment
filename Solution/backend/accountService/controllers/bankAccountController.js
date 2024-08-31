const BankAccountsModel = require('../models/bankAccountsModel');

// Create and export the createAccount function
exports.createAccount = async (req, res) => {
    const { customerID, name, surname } = req.body;

       // Backend validation
       const nameRegex = /^[a-zA-Z\s]+$/;
       if (!nameRegex.test(name) || !nameRegex.test(surname)) {
           return res.status(400).send('Name and surname should contain only letters.');
       }

       
    try {
        const existingAccount = await BankAccountsModel.getAccount(customerID);
        if (existingAccount) {
            return res.status(400).send('Account already exists!');
        }
        console.log('Creating account:', customerID, name, surname);
        await BankAccountsModel.createAccount(customerID, name, surname);
        res.status(200).send('Account created successfully!');
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Export the getAccount function
exports.getAccount = async (req, res) => {
    const { customerID } = req.params;

    try {
        const account = await BankAccountsModel.getAccount(customerID);
        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).send('Account not found!');
        }
    } catch (error) {
        console.error('Error fetching account:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.addTransactionsToAccount = async (req, res) => {
    try {
        // Extract the customerID and transactions from the request
        const { customerID } = req.params;
        const { transactions } = req.body;

        await BankAccountsModel.addTransactionsToAccount(customerID, transactions);

        res.status(200).json({ message: 'Transactions added successfully!' });
    } catch (error) {
        console.error('Error adding transactions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};