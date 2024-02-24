/**
 *  Title: Fat Daddy's
 *  Author: Brooke Taylor
 *  Date: 02/23/2024
 *  Description: Fat Daddy's order database setup.
 *
 *  To run:
 *
 *    node db_orders_init.js
 *
 */

'use strict'

const { MongoClient } = require('mongodb')
const DB_USERNAME = 'fatdaddysAdmin'
const DB_PASSWORD = 's3cret'
const DB_NAME = 'fatdaddys'


const MONGO_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@bellevueuniversity.kqpr8ra.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`


const client = new MongoClient(MONGO_URL)

async function dbInit() {
  try {
    const db = client.db(DB_NAME)

    await db.dropCollection('orders')

    await db.createCollection('orders', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          properties: {
            orderNumber: { bsonType: 'number' },
            orderDate: { bsonType: 'string' },
            orderTime: { bsonType: 'string' },
            pickupContact: { bsonType: 'string' },
            pickupEmail: { bsonType: 'string' },
            pickupDate: { bsonType: 'string' },
            pickupTime: { bsonType: 'string' },
            items: {
              bsonType: 'array',
              items: {
                bsonType: 'object',
                properties: {
                  category: { bsonType: 'string' },
                  details: { bsonType: 'string' },
                  comments: { bsonType: 'string' },
                  price: { bsonType: 'number' },
                },
              },
            },
            discountCode: { bsonType: 'string' },
            discount: { bsonType: 'number' },
            subtotal: { bsonType: 'number' },
            tax: { bsonType: 'number' },
            total: { bsonType: 'number' },
            invoiced: { bsonType: 'bool' },
          },
        },
      },
    })


    await db.collection('orders').createIndex({ email: 1 }, { unique: true })

    const orders = [
      {
        orderNumber: 1001,
        orderDate: '2024-02-23',
        orderTime: '06:34:56-06:00',
        pickupContact: 'Average Joe',
        pickupEmail: 'averagejoe@email.com',
        pickupDate: '2024-02-23',
        pickupTime: '07:15:00-06:00',
        items: [
          {
            category: 'Burger',
            details: 'Sesame Seeds, Hamburger, American, Lettuce, Tomato, Onion',
            comments: 'for joe',
            price: 9.99,
          },
          {
            category: 'Pizza',
            details: 'Medium, Hand-tossed, Classic, Mozzarella, Green Peppers, Canadian Bacon',
            comments: 'for Mrs and Kiddo',
            price: 9.99,
          },
          {
            category: 'Onion Rings',
            details: '',
            comments: '',
            price: 3.99,
          },          
        ],
        discountCode: '',
        discount: 0,
        subtotal: 23.97,
        tax: 2.39,
        total: 26.36,
        invoiced: false,
      },

      // other orders...

    ]

    // Insert the records into MongoDB Atlas
    await db.collection('orders').insertMany(orders)
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
