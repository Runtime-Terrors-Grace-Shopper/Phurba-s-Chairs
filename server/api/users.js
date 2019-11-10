const router = require('express').Router()
const {User, Order, Product, OrderProduct} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    req.session.cart = []
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'name', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: Order,
          where: {
            status: 'Completed'
          },
          include: [
            {
              model: OrderProduct,
              include: [
                {
                  model: Product,
                  as: 'product'
                }
              ]
            }
          ]
        }
      ]
    })

    if (user === null) {
      res.sendStatus(404)
    } else {
      res.json(user)
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
