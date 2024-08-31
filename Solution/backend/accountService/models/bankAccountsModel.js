const { collection, addDoc, doc, updateDoc, query, where, getDocs } = require("firebase/firestore");
const db = require('../firebase');

const accountsRef = collection(db, "accounts");

class BankAccountsModel {
    // Create account method
    static async createAccount(customerID, name, surname) {
        try {
            const newAccount = {
                id: customerID,
                name: name,
                surname: surname,
                balance: 0,
                transactions: []
            };
          
            const docRef = await addDoc(accountsRef, newAccount);
        } catch (error) {
            console.error("Error adding account: ", error);
        }
    }

    // Get account method
    static async getAccount(customerID) {
        try {
            const q = query(accountsRef, where("id", "==", customerID));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                console.log("No matching account found.");
                return null;
            }

            let accountData = null;
            querySnapshot.forEach((doc) => {
                accountData = doc.data();
                accountData.docId = doc.id; // Store the document ID
            });
            console.log("Account found:", accountData);
            return accountData;

        } catch (error) {
            console.error("Error getting account: ", error);
            return null;
        }
    }

    // Add transactions to account method
    static async addTransactionsToAccount(customerID, newTransactions) {
        try {
            const account = await this.getAccount(customerID);
            if (!account) {
                throw new Error('Account not found');
            }

            const docRef = doc(db, "accounts", account.docId);

            const updatedTransactions = [...account.transactions, ...newTransactions];
            const updatedBalance = account.balance + newTransactions.reduce((sum, txn) => sum + txn.amount, 0); 

            await updateDoc(docRef, {
                transactions: updatedTransactions,
                balance: updatedBalance
            });
            
            console.log("Transactions added successfully");
        } catch (error) {
            console.error("Error adding transactions:", error);
            throw new Error('Transactions update failed');
        }
    }
}

module.exports = BankAccountsModel;
