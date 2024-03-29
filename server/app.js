/**
 *  Title: Fat Daddy's
 *  Author: Brooke Taylor
 *  Date: 02/22/2024
 *  Description: Server App
 */

'use strict'

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;




// Routes
const customerRoute = require('./routes/customer');






// connection string for MongoDB
const conn =
  "mongodb+srv://fatdaddysAdmin:s3cret@bellevueuniversity.kqpr8ra.mongodb.net/fatdaddys?retryWrites=true&w=majority";

mongoose
    .connect(conn)
    .then(() => {
        console.log(
            "Connection to MongoDB successful."
        );
    })
    .catch((err) => {
        console.log("MongoDB Error: " + err.message);
    });


// Configure the app
app.use(express.json())


// App Routes
app.use('/api/customers', customerRoute)






app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
