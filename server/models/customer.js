/**
 *  Title: Fat Daddy's
 *  Author: Brooke Taylor
 *  Date: 02/24/2024
 *  Description: customer schema
 */

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  birthday: {
    type: String,
    required: false
  },
  bdayDiscountUsed: {
    type: String,
    required: false
  },
  created: {
    type: String,
    required: true
  },
  lastLogin: {
    type: String,
    required: false
  },
  points: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  selectedSecurityQuestions: [
    {
      question: {
        type: String,
        required: true
      },
      answer: {
        type: String,
        required: true
      },
    },
  ],
});

module.exports = mongoose.model('Customer', customerSchema);
