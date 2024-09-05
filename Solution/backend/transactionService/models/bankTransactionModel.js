const { collection, addDoc, query, where, getDocs } = require("firebase/firestore");
const db = require('../firebase');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');


const transactionsRef = collection(db, "transactions");

// Create bank transaction model class that is responsible for creating and retrieving bank transactions
class BankTransactionModel {
    // Create transaction method that takes customerID and amount as parameters
    static async createTransaction(customerID, amount) {
         // Check if the customer has an account
         const accountResponse = await axios.get(`https://hosted-back-end-assignment-7.onrender.com/account/getAccount/${customerID}`);
         if (accountResponse.status !== 200) {
            console.error("No account found for the customer.");
             throw new Error('Account not found');
         }

        try {
            // Generate transaction data
            const transactionData = {
                customerID: customerID,
                transactionID: uuidv4(),
                amount: amount,
                date: new Date().toISOString(),
                transactionData: 'Deposit'
            };
        
            // Add the new transaction to the customer account
            await axios.post(`https://hosted-back-end-assignment-7.onrender.com/account/addTransactions/${customerID}`, {
                transactions: [{"transactionID": transactionData.transactionID,
                                "transactionData": transactionData.transactionData,
                                "amount": transactionData.amount,
                                "date": transactionData.date,
                                "customerID": transactionData.customerID
                }]
            });

            console.log("Transaction added and account updated successfully.");
            
              // Add transaction to the transactions collection
              await addDoc(transactionsRef, transactionData);

        } catch (error) {
            console.error("Error adding transaction:", error);
            throw new Error("Transaction failed");
        }
    }

    // GetTransaction method that takes customerID as parameter and returns the transactions for that customer
    static async getTransactions(customerID) {
        try {
            // Retrieve transactions from the transactions collection
            const q = query(transactionsRef, where("customerID", "==", customerID));
            const querySnapshot = await getDocs(q);
            // Create an array to store the transactions
            const transactions = [];
            querySnapshot.forEach((doc) => {
                transactions.push(doc.data());
            });
            // Return the transactions
            return transactions;
        } catch (e) {
            console.error("Error retrieving transactions:", e);
            return [];
        }
    }
}

// Export the BankTransactionModel class
module.exports = BankTransactionModel;
