Title: Fat Daddy's Bar & Grill  
Author: Brooke Taylor  
Date: 02/24/2024  
Description: Routes Setup. 

# Project Routes Setup. 

1. Installing validator to check if a user's email is in valid email format.

        npm install validator

2. In the `app.js` file, we need to add app.use(express.json()), so that we can send/receive json data.

        app.use(express.json())
