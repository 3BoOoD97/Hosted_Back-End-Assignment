const chai = require('chai');
const expect = chai.expect;
const request = require('supertest'); 
const app = require('../app');

describe('Account Service', function() {

    // Test creating account 
    it('should create an account successfully', async function() {
        const response = await request(app)
            .post('/account/createAccount')
            .send({
                customerID: '123',
                name: 'Rolf',
                surname: 'Amelia'
            });
        expect(response.status).to.equal(200);
        expect(response.text).to.equal('Account created successfully!');
    });

    
    // Test fetching account
    it('should get account successfully', async function() {
        await request(app)
            .post('/account/createAccount')
            .send({
                customerID: '1234',
                name: 'Gabriele',
                surname: 'Jon'
            });

        const response = await request(app)
            .get('/account/getAccount/1234');

        expect(response.status).to.equal(200);
        expect(response.body).to.include({
            id: '1234',
            name: 'Gabriele',
            surname: 'Jon',
            balance: 0,
            //transactions: []
        });
        expect(response.body.transactions).to.be.an('array').that.is.empty;

    });
    

    
    // Test adding transactions to account
    it('should add transactions to account successfully', async function() {
        const response = await request(app)
            .post('/account/addTransactions/1234')
            .send({
                transactions: [
                    {
                        transactionID: 'trans1',
                        transactionData: 'Deposit',
                        amount: 100,
                        date: new Date().toISOString(),
                        customerID: '1234'
                    }
                ]
            })
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Transactions added successfully!');
    });
   
});
