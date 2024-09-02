'use strict';

// Elements
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balanceValue');
const resultContainer = document.querySelector('.resultContainer');
const searchTransactionForm = document.getElementById('searchTransactionForm');
const searchForCustomerForm = document.getElementById('searchForCustomerForm');
const addTransactionForm = document.getElementById('addTransactionForm');

// Function to handle click event to toggle transaction details
function toggleDetails(event) {
  const row = event.currentTarget;
  row.classList.toggle('expanded');
}

// Fetch and display transactions
searchTransactionForm.addEventListener('submit', (event) => {
  event.preventDefault();
  resultContainer.innerHTML = '';
  const customerID = document.getElementById('searchCustomerID').value;

  fetch(`https://transaction-5ea0.onrender.com/getTransactions/${customerID}`)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Inspect the API response here
    resultContainer.innerHTML = data.map((transaction, index) => `
      <div class="resultContainerRow" data-id="${transaction.id}" onclick="toggleDetails(event)">
        <div class="depositIcon">
          ${index + 1} Deposit
        </div>
        <div class="containerRowDetails">
          ${transaction.amount}€
        </div>
        <div class="transactionDetails">
          <div class="transactionId">Transaction ID: ${transaction.transactionID }</div>
  ${transaction.date ? new Date(transaction.date).toLocaleString('en-US', { 
          dateStyle: 'medium', 
          timeStyle: 'short' 
        }) : 'N/A'}        </div>
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

// Search for a customer (not expanded)
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
        <div class="resultContainerRow" data-id="${transaction.id}" onclick="toggleDetails(event)">
          <div class="depositIcon">
            ${index + 1} Deposit
          </div>
          <div class="containerRowDetails">
            ${transaction.amount}€
          </div>
          <div class="transactionDetails">
            <div class="transactionId">ID: ${transaction.transactionID}</div>
            <div class="transactionDate">${new Date(transaction.date).toLocaleDateString()}</div>
          </div>
        </div>
      `).join('');
    })
    .catch(error => {
      console.error('Error loading transactions:', error);
      alert(error.message);
    });
});
