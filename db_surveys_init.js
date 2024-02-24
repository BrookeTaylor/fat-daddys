/**
 *  Title: Fat Daddy's
 *  Author: Brooke Taylor
 *  Date: 02/23/2024
 *  Description: Fat Daddy's survey database setup.
 *
 *  To run:
 *
 *    node db_surveys_init.js
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

    await db.dropCollection('surveys')

    await db.createCollection('surveys', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          properties: {
            questionOne: { bsonType: 'number' },
            questionTwo: { bsonType: 'number' },
            suggestions: { bsonType: 'string' },
            stars: { bsonType: 'number' },
            title: { bsonType: 'string' },
            message: { bsonType: 'string' },
            date: { bsonType: 'string' },
            code: { bsonType: 'string' },
            fullName: { bsonType: 'string' },
            email: { bsonType: 'string' },
            redeemed: { bsonType: 'bool' },
          },
        },
      },
    })


    await db.collection('surveys').createIndex({ email: 1 }, { unique: true })

    const surveys = [
      {
        questionOne: 5  ,
        questionTwo: 5,
        suggestions: `It's impossible to find the pickup location!`,
        stars: 4.5,
        title: 'Best Ever!',
        message: `I wish this place was real! I would eat here everyday!`,
        date: '2024-02-23',
        code: '8ZV5X7A',
        fullName: `Average Joe`,
        email: `averagejoe@email.com`,
        redeemed: false,
      },

      // other surveys...

    ]

    // Insert the records into MongoDB Atlas
    await db.collection('surveys').insertMany(surveys)
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
