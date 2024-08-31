'use strict';

// Elements
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balanceValue');
const resultContainer = document.querySelector('.resultContainer');
const searchTransactionForm = document.getElementById('searchTransactionForm');
const searchForCustomerForm = document.getElementById('searchForCustomerForm');




//Once the user clicks on Search For Transactions button this function will be called
searchTransactionForm.addEventListener('submit', (event) => {
  // Prevent the form from submitting and refreshing the page
  event.preventDefault();
  // Clear the resultContainer
  resultContainer.innerHTML = '';
  // Get the value from the customerID input field
  const customerID = document.getElementById('searchCustomerID').value;

  // Fetch the transactions for the given customer ID
  fetch(`http://localhost:3002/getTransactions/${customerID}`)
    .then(response => {
      if (!response.ok) {
        // If the response is not OK, throw an error
        return response.text().then(text => {
          throw new Error(text);
        });
      }
      // If the response is OK, parse it as JSON
      return response.json();
    })
    .then(data => {
      // Assuming resultContainer is a defined element
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
      // Display the error message to the user
      alert(error.message);
    });
});


//Once the user clicks on Add Transaction button this function will be called
addTransactionForm.addEventListener('submit', (event) => {
 // Prevent the form from submitting and refreshing the page
 event.preventDefault();

 // get the values from the fields in the addTransactionForm
 const customerID = document.getElementById('addCustomerID').value;
 const amount = Number(document.getElementById('amount').value);


 const requestData = {
     customerID: customerID,
     amount: amount
   };
   // Just to check the requestData object
   console.log(requestData);

     // Send a POST request to the transactionService server
   fetch('http://localhost:3002/addTransaction', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(requestData)
   })
   // If the request is successful, alert the response data
   .then(response => response.text()) 
   .then(data => alert(data))
     // If the request is unsuccessful, log the error
   .catch(error => console.error('Error:', error)); 
});



//Once the user clicks on Search For Customer button this function will be called
searchForCustomerForm.addEventListener('submit', (event) => {
  // Prevent the form from submitting and refreshing the page
  event.preventDefault();
  // Clear the resultContainer
  resultContainer.innerHTML = '';
  // Get the value from the customerID input field
  const customerID = document.getElementById('searchCustomerID').value;

  // Fetch the transactions for the given customer ID
  fetch(`http://localhost:3001/account/getAccount/${customerID}`)
      .then(response => {
      if (!response.ok) {
        // If the response is not OK, throw an error
        return response.text().then(text => {
          throw new Error(text);
        });
      }
      // If the response is OK, parse it as JSON
      return response.json();
    })
    .then(data => {
      // Assuming resultContainer is a defined element
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
      // Display the error message to the user
      alert(error.message);
    });
});
 


