'use strict';

// Elements
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balanceValue');
const resultContainer = document.querySelector('.resultContainer');
const searchTransactionForm = document.getElementById('searchTransactionForm');
const searchForCustomerForm = document.getElementById('searchForCustomerForm');
const addTransactionForm = document.getElementById('addTransactionForm');

// Once the user clicks on Search For Transactions button this function will be called
searchTransactionForm.addEventListener('submit', (event) => {
  // Prevent the form from submitting and refreshing the page
  event.preventDefault();
  // Clear the resultContainer
  resultContainer.innerHTML = '';
  // Get the value from the customerID input field
  const customerID = document.getElementById('searchCustomerID').value;

  // Fetch the transactions for the given customer ID
  fetch(`https://transaction-5ea0.onrender.com/getTransactions/${customerID}`)
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(text);
        });
      }
      return response.json();
    })
    .then(data => {
      resultContainer.innerHTML = data.map((transaction, index) => `
        <div class="resultContainerRow">
          <div class="depositIcon">
            ${index + 1} Deposit
          </div>
          <div class="containerRowDetails">
            ${transaction.amount}€
          </div>
        </div>
      `).join('');
    })
    .catch(error => {
      console.error('Error loading transactions:', error);
      alert(error.message);
    });
});

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

// Once the user clicks on Search For Customer button this function will be called
searchForCustomerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  resultContainer.innerHTML = '';
  const customerID = document.getElementById('searchCustomerID').value;

  fetch(`https://hosted-back-end-assignment-7.onrender.com/account/getAccount/${customerID}`)
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(text);
        });
      }
      return response.json();
    })
    .then(data => {
      resultContainer.innerHTML = data.map((transaction, index) => `
        <div class="resultContainerRow">
          <div class="depositIcon">
            ${index + 1} Deposit
          </div>
          <div class="containerRowDetails">
            ${transaction.amount}€
          </div>
        </div>
      `).join('');
    })
    .catch(error => {
      console.error('Error loading transactions:', error);
      alert(error.message);
    });
});
