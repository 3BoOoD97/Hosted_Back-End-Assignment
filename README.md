# Project Setup Instructions

## Overview

This project comprises a backend with two services (Account Service and Transaction Service) and a frontend application. The backend is deployed and connected to a Firebase database, while the frontend interacts with the backend APIs.

## Demo
https://66d5fa0c176d692bcc411325--capable-narwhal-617854.netlify.app/accountpage
## Prerequisites

Before starting, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) (for package management)
- [Git](https://git-scm.com/)

## 1. Cloning the Repository

Clone the repository to your local machine:



```bash
git clone <repository-url>
cd <repository-directory>
```

Replace <repository-url> with the actual URL of your project’s repository and <repository-directory> with the directory name where the project will be stored.



## 2. Setting Up Environment Variables


Even though the backend services are deployed, if you are running the backend locally or testing locally, you may need to set up environment variables.

1- Create a .env file in the root of each service directory (Account Service and Transaction Service).

2- Add the required Firebase configuration and other environment variables to the .env files:
```bash
# .env file for Account Service
FIREBASE_API_KEY=<your-firebase-api-key>
FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
FIREBASE_PROJECT_ID=<your-firebase-project-id>
FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
FIREBASE_APP_ID=<your-firebase-app-id>
ACCOUNT_SERVICE_PORT=3001

# .env file for Transaction Service
FIREBASE_API_KEY=<your-firebase-api-key>
FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
FIREBASE_PROJECT_ID=<your-firebase-project-id>
FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
FIREBASE_APP_ID=<your-firebase-app-id>
TRANSACTION_SERVICE_PORT=3002
```

Since the services are already deployed, these environment variables might not be necessary for running the frontend or testing locally if you're connecting to the deployed backend.
## 3. Installing Dependencies
Navigate to each service directory (accountService and transactionService) and install the required dependencies:

```bash
cd accountService
npm install
```
```bash
cd transactionService
npm install
```


## 4. Running the Services Locally
- Account Service:
```bash
cd accountService
npm start
```
The Account Service will run on http://localhost:3001.


- Transaction Service:
```bash
cd transactionService
npm start
```
The Transaction Service will run on http://localhost:3002.

If running locally, make sure to adjust any API calls in the frontend to point to http://localhost:3001 and http://localhost:3002 instead of the deployed URLs



## 5. Testing
- Account Service:
```bash
cd accountService
npm test
```

- Transaction Service:
```bash
cd transactionService
npm test
```
