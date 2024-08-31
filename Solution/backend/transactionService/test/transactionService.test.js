require('dotenv').config();
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const ACCOUNT_SERVICE_PORT = process.env.ACCOUNT_SERVICE_PORT || 3001;
const TRANSACTION_SERVICE_PORT = process.env.TRANSACTION_SERVICE_PORT || 3002;



describe('Transaction Service', function() {
    
    // Test transaction creation
    it('should create a transaction successfully', async function() {
        // First, create an account
        await request(`http://localhost:${ACCOUNT_SERVICE_PORT}`)
            .post('/account/createAccount')
            .send({
                customerID: '2345',
                name: 'Nea',
                surname: 'Pratik'
            });

            const response = await request(`http://localhost:${TRANSACTION_SERVICE_PORT}`)
            .post('/addTransaction')
            .send({
                customerID: '2345',
                amount: 100
            });

        // Log the response for debugging
        console.log('Transaction Creation Response:', response.body);

        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal({message: 'Transaction created successfully!'});
    });

    // Test fetching transactions
    it('should get transactions for a customer successfully', async function() {
        await request(`http://localhost:${ACCOUNT_SERVICE_PORT}`)
            .post('/account/createAccount')
            .send({
                customerID: '23456',
                name: 'Viktoria',
                surname: 'Awa'
            });

            await request(`http://localhost:${TRANSACTION_SERVICE_PORT}`)
            .post('/addTransaction')
            .send({
                customerID: '23456',
                amount: 50
            });

            const response = await request(`http://localhost:${TRANSACTION_SERVICE_PORT}`)
            .get('/getTransactions/23456');

        // Log the response for debugging
        console.log('Get Transactions Response:', response.body);

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array').that.is.not.empty;
        expect(response.body[0]).to.include({
            amount: 50
        });
    });
});
