/**
 *  Title: Fat Daddy's
 *  Author: Brooke Taylor
 *  Date: 02/23/2024
 *  Description: Fat Daddy's customer database setup.
 *
 *  To run:
 *
 *    node db_customers_init.js
 *
 */

'use strict'

const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')
const DB_USERNAME = 'fatdaddysAdmin'
const DB_PASSWORD = 's3cret'
const DB_NAME = 'fatdaddys'


const MONGO_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@bellevueuniversity.kqpr8ra.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

const saltRounds = 10

const client = new MongoClient(MONGO_URL)

async function dbInit() {
  try {
    const db = client.db(DB_NAME)

    await db.dropCollection('customers')

    await db.createCollection('customers', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          properties: {
            role: { bsonType: 'string' },
            firstName: { bsonType: 'string' },
            lastName: { bsonType: 'string' },
            phoneNumber: { bsonType: 'number' },
            address: { bsonType: 'string' },
            birthday: { bsonType: 'string' },
            bdayDiscountUsed: { bsonType: 'string' },
            created: { bsonType: 'string' },
            lastLogin: { bsonType: 'string' },
            points: { bsonType: 'number' },
            email: { bsonType: 'string' },
            password: { bsonType: 'string' },
            selectedSecurityQuestions: {
              bsonType: 'array',
              items: {
                bsonType: 'object',
                properties: {
                  question: { bsonType: 'string' },
                  answer: { bsonType: 'string' },
                },
              },
            },
          },
        },
      },
    })


    await db.collection('customers').createIndex({ email: 1 }, { unique: true })

    const customers = [
      {
        role: 'customer',
        firstName: 'Average',
        lastName: 'Joe',
        phoneNumber: 8161234567,
        address: '123 Main St',
        birthday: '',
        bdayDiscountUsed: '',
        created: '2024-02-23T09:11:26-06:00', 
        lastLogin: '',
        points: 150,
        email: 'averagejoe@email.com',
        password: bcrypt.hashSync('Password01!', saltRounds),
        selectedSecurityQuestions: [
          {
            question: 'What is your favorite book?',
            answer: '1984',
          },
          {
            question: 'What is your favorite vacation destination?',
            answer: 'Washington, D.C.',
          },
          {
            question: 'What is your favorite food?',
            answer: 'Cheeseburger',
          },
        ],
      },

      // other customers...

    ]

    // Insert the records into MongoDB Atlas
    await db.collection('customers').insertMany(customers)
  } catch (err) {
    throw err
  } finally {
    await client.close()
  }
}


function getDateTime() {
  const now = new Date()
  const date = now.toLocaleDateString('en-US')
  const time = now.toLocaleTimeString('en-US')

  return `${date} ${time}`
}

async function run () {
  try {
    await dbInit()

    console.log('\n  End of program ', getDateTime())
  } catch (err) {
    console.error(err)
  }
}

run() // run the main function
