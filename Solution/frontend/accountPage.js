const searchForCustomerForm = document.getElementById('searchForCustomerForm');
const addCustomerForm = document.getElementById('addCustomerForm');
const customersContainer = document.getElementById('customersContainer');



searchForCustomerForm.addEventListener('submit', (event) => {
 // Prevent the form from submitting and refreshing the page
 event.preventDefault();
 customersContainer.innerHTML = '';
 // Get the value from the customerID input field
 const customerID = document.getElementById('searchCustomerID').value;

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
    // Assuming customersContainer is a defined element
    customersContainer.innerHTML = `
      <div class="resultContainerRow">
         <div class="userIcon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 14s-1 0-1-1 1-4 7-4 7 3 7 4-1 1-1 1H2z"/>
        </svg>
    </div>
        <div class="containerRowDetails">
          ${data.id}, ${data.name}, ${data.surname}
        </div>
      </div>
    `;
    console.log(data);
  })

  .catch(error => {
    console.error('Error loading account:', error);
    // Display the error message to the user
    alert(error.message);
  });
} );


// Function to validate input
function validateNameInput(input) {
  const regex = /^[a-zA-Z\s]*$/; // Allow only letters and spaces
  return regex.test(input);
}

// Add event listeners to validate input
customerFirstName.addEventListener('input', () => {
  if (!validateNameInput(customerFirstName.value)) {
      customerFirstName.value = customerFirstName.value.replace(/[^a-zA-Z\s]/g, '');
  }
});

customerSurName.addEventListener('input', () => {
  if (!validateNameInput(customerSurName.value)) {
      customerSurName.value = customerSurName.value.replace(/[^a-zA-Z\s]/g, '');
  }
});

// Add Customer Form Submission
addCustomerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const customerID = document.getElementById('addCustomerID').value;
  const name = customerFirstName.value;
  const surname = customerSurName.value;

  // Additional validation before submitting
  if (!validateNameInput(name) || !validateNameInput(surname)) {
      alert('Name and Surname should contain only letters.');
      return;
  }

  const requestData = {
      customerID: customerID,
      name: name,
      surname: surname,
  };

  fetch('http://localhost:3001/account/createAccount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData)
  })
  .then(response => response.text())
  .then(data => alert(data))
  .catch(error => console.error('Error:', error));
});