/**
 *  Title: Fat Daddy's
 *  Author: Brooke Taylor
 *  Date: 02/24/2024
 *  Description: customer route
 */

'use strict'

const express = require('express')
const router = express.Router()

// Hash Customer's passwords. 
const bcrypt = require('bcryptjs');


// Import Customer Module
const Customer = require('../models/customer');


// Email Validate function
const validator = require('validator');

function isValidEmail(email) {
  return validator.isEmail(email)
}




/**
 * findAll
 */
router.get('/', async (req, res, next) => {
  try {
    const customers = await Customer.find().exec();

    if (!customers || customers.length === 0) {
      // Empty result set
      res.status(204).send();

    } else {
      // Successful response
      console.log(`Found ${customers.length} customers`);
      res.status(200).json(customers);
    }

  } catch (err) {
    // Handle errors
    console.error('Error in findAll:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




/**
 * findByEmail
 */
router.get('/findByEmail/:email', async (req, res, next) => {
  try {
    const email = req.params.email;

    if (!isValidEmail(email)) {
      // Validate email
      res.status(400).json({ message: 'Invalid Email format' });
      return;
    }

    // Use Mongoose to query the "customers" collection
    const customer = await Customer.findOne({ email }).exec();

    if (!customer) {
      // Customer not found
      const err = new Error('Customer not found');
      err.status = 404;
      next(err);

    } else {
      // Successful response
      console.log(`${customer.email} found!`);
      res.status(200).send(customer);
    }

  } catch (err) {
    // Handle errors
    console.error('err', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});






/**
 * createCustomer
 */
router.post('/createCustomer', async (req, res, next) => {
  try {
    // Hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);

    // Creating Customer
    const savedCustomer = await Customer.create(req.body);

    // Successful Customer creation
    res.status(201).json(savedCustomer);

  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email === 1) {
      // Email exists
      res.status(409).json({ message: 'Email already exists' });
      
    } else {
      // Handle other errors
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});










/**
 * updateCustomer
 */
router.put('/updateCustomer/:email', async (req, res, next) => {
  try {
    const email = req.params.email;
    const updateData = req.body;

    const filter = {
      firstName: updateData.firstName,
      lastName: updateData.lastName,
      phoneNumber: updateData.phoneNumber,
      address: updateData.address,
    };

    const updatedCustomer = await Customer.findOneAndUpdate(
      { email: email },
      filter,
      { new: true }
    );

    if (updatedCustomer) {
      // Successful update
      res.status(200).json(updatedCustomer);

    } else {
      // Not found
      res.status(404).json({ message: 'Customer not found' });
    }

  } catch (err) {
    if (err.name === 'ValidationError') {
      // Bad Request
      res.status(400).json({ message: 'Validation error', errors: err.errors });

    } else {
      console.error(err);
      // Handle Other Errors
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});




/**
 * updateCustomerBday
 */
router.put('/updateCustomerBday/:email', async (req, res, next) => {
  try {
    const email = req.params.email;
    const newBirthday = req.body.birthday; // Assuming the request body has a 'birthday' field

    // You can add validation for the birthday format or any other necessary checks here

    const updatedCustomer = await Customer.findOneAndUpdate(
      { email: email },
      { birthday: newBirthday },
      { new: true }
    );

    if (updatedCustomer) {
      // Successful update
      res.status(200).json(updatedCustomer);

    } else {
      // Not found
      res.status(404).json({ message: 'Customer not found' });
    }

  } catch (err) {
    if (err.name === 'ValidationError') {
      // Bad Request
      res.status(400).json({ message: 'Validation error', errors: err.errors });

    } else {
      console.error(err);
      // Handle Other Errors
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});





/**
 * updateBdayDiscountUsed
 */
router.put('/updateBdayDiscountUsed/:email', async (req, res, next) => {
  try {
    const email = req.params.email;
    const bdayDiscountUsed = req.body.bdayDiscountUsed; 


    const updatedCustomer = await Customer.findOneAndUpdate(
      { email: email },
      { bdayDiscountUsed: bdayDiscountUsed },
      { new: true }
    );

    if (updatedCustomer) {
      // Successful update
      res.status(200).json(updatedCustomer);

    } else {
      // Not found
      res.status(404).json({ message: 'Customer not found' });
    }

  } catch (err) {
    if (err.name === 'ValidationError') {
      // Bad Request
      res.status(400).json({ message: 'Validation error', errors: err.errors });

    } else {
      console.error(err);
      // Handle Other Errors
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});





module.exports = router
