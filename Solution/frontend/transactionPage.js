'use strict';

// Elements
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balanceValue');
const resultContainer = document.querySelector('.resultContainer');
const searchTransactionForm = document.getElementById('searchTransactionForm');
const addTransactionForm = document.getElementById('addTransactionForm');




// Function to add a transaction
addTransactionForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const customerID = document.getElementById('addCustomerID').value;
  const amount = Number(document.getElementById('amount').value);

  const requestData = {
    customerID: customerID,
    amount: amount
  };

  fetch('https://transaction-5ea0.onrender.com/addTransaction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
  .then(response => response.json())
  .then(data => alert(data.message))
  .catch(error => console.error('Error:', error));
});



// Fetch and display transactions
searchTransactionForm.addEventListener('submit', (event) => {
  event.preventDefault();
  resultContainer.innerHTML = '';
  const customerID = document.getElementById('searchCustomerID').value;

  fetch(`https://transaction-5ea0.onrender.com/getTransactions/${customerID}`)
    .then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(errorData.message || 'Failed to fetch transactions');
        });
      }
      return response.json();
    })
    .then(data => {
      // Validate if the data is an array
      if (Array.isArray(data)) {
        resultContainer.innerHTML = data.map((transaction, index) => `
          <div class="resultContainerRow" data-id="${transaction.id}">
            <div class="depositIcon">
              ${index + 1} Deposit
            </div>
            <div class="containerRowDetails">
              ${transaction.amount}€
            </div>
            <div class="transactionDetails">
              <div class="transactionId">Transaction ID: ${transaction.transactionID}</div>
              ${transaction.date ? new Date(transaction.date).toLocaleString('en-US', { 
                dateStyle: 'medium', 
                timeStyle: 'short' 
              }) : 'N/A'}
            </div>
          </div>
        `).join('');
      } else {
        // Handle unexpected data format
        throw new Error('Unexpected data format received from the server.');
      }
    })
    .catch(error => {
      console.error('Error loading transactions:', error);
      alert(error.message);
    });
});

