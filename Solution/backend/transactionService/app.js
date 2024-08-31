const express = require('express');
const router=require('./routes/bankTransactionRoutes'); 
const app = express();


const cors = require('cors');  
app.use(cors());  

// Use the express.json() middleware to parse the request body
app.use(express.json());

// Use the router to define routes on the app
app.use(router);

// Define the port number
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Transaction Service running on http://localhost:${PORT}`);
});

module.exports = app;