'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Product} = require('../server/db/products')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({name: 'Cody Miller', email: 'cody@email.com', password: '123', imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7WTMxu2IiDoDS7mvXPqYOT7l5s_a-R81XD65dNoIY_yva1Atryw&s', phoneNumber: '2053455273', }),
    User.create({name: 'Bob Miller', email: 'bob@email.com', password: '123', imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7WTMxu2IiDoDS7mvXPqYOT7l5s_a-R81XD65dNoIY_yva1Atryw&s', phoneNumber: '9174578372', }),
    User.create({name: 'Jack Miller', email: 'jack@email.com', password: '123', imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7WTMxu2IiDoDS7mvXPqYOT7l5s_a-R81XD65dNoIY_yva1Atryw&s', phoneNumber: '4538724598', }),
    User.create({name: 'Sarah Miller', email: 'sarah@email.com', password: '123', imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7WTMxu2IiDoDS7mvXPqYOT7l5s_a-R81XD65dNoIY_yva1Atryw&s', phoneNumber: '2019157493', }),
  ])

  const products = await Promise.all([
    Product.create({name: 'Sofa Chair', price: '350', stock: '98', imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR9kxQQOXVjJas4QRQGwuZoJKukmohKNFvFAKwPUX7lDPfCQjb0Q&s', category: 'Chair', color: 'Blue', description: 'A comfy place to sit'}),
    Product.create({name: 'Dining Table', price: '1200', stock: '37', imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR9kxQQOXVjJas4QRQGwuZoJKukmohKNFvFAKwPUX7lDPfCQjb0Q&s', category: 'Table', color: 'Black', description: 'Where you eat'}),
    Product.create({name: 'Dining Room Chair', price: '125', stock: '52', imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR9kxQQOXVjJas4QRQGwuZoJKukmohKNFvFAKwPUX7lDPfCQjb0Q&s', category: 'Chair', color: 'Black', description: 'Where you sit when you eat'}),
    Product.create({name: 'Study Desk', price: '575', stock: '14', imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR9kxQQOXVjJas4QRQGwuZoJKukmohKNFvFAKwPUX7lDPfCQjb0Q&s', category: 'Table', color: 'Brown', description: 'State of the art work desk'}),
  ])

  console.log(`seeded ${users.length} users and ${products.length} products`)
  console.log(`seeded successfully`)
}


// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7WTMxu2IiDoDS7mvXPqYOT7l5s_a-R81XD65dNoIY_yva1Atryw&s