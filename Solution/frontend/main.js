// define the elements
const createAccountForm = document.getElementById('createAccountForm');
const addTransactionForm = document.getElementById('addTransactionForm');
const userInfoDiv = document.getElementById('userInfoDiv');
const transactionsDiv = document.getElementById('transactionsDiv');

// Once the user clicks on Create Account button this function will be called
createAccountForm.addEventListener('submit', (event) => {
       // Prevent the form from submitting and refreshing the page
       event.preventDefault();

    // get the values from the fields in the createAccountForm
    const customerID = document.getElementById('customerID').value;
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    
  
    // create a request data object to send to accountService server
    const requestData = {
        customerID: customerID,
        name: name,
        surname: surname 
      };
      // Just to check the requestData object
      console.log(requestData);

        // Send a POST request to the accountService server
      fetch('http://localhost:3001/account/createAccount', {
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

    // Once the user clicks on Add Transaction btn button this function will be called
    addTransactionForm.addEventListener('submit', (event) => {
       // Prevent the form from submitting and refreshing the page
       event.preventDefault();

    // get the values from the fields in the addTransactionForm
    const customerID = document.getElementById('transID').value;
    const amount = document.getElementById('amount').value;
  
    // create a request data object to send to transactionService server
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
      loadUserInfo(customerID)
      loadTransactions(customerID)
        // If the request is unsuccessful, log the error
      .catch(error => console.error('Error:', error)); 
});


// A method to load the transactions
function loadTransactions(customerID) {
  fetch(`http://localhost:3002/getTransactions/${customerID}`)
    .then(response => response.json())
    .then(data => {
      transactionsDiv.innerHTML = `
        <h2>Transactions</h2>
        <ul>
          ${data.map(transaction => `<li>${transaction.id} - ${transaction.amount}</li>`).join('')}
        </ul>
      `;
      console.log(data);
    })
    .catch(error => console.error('Error:', error));
}