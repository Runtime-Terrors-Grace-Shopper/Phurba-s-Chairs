const router = require('express').Router()
const {User, Order, Product, OrderProduct} = require('../db/models')

const isAdmin = () => {
  return (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next()
    } else {
      res.status(403).send('Permission Denied')
    }
  }
}

router.get('/', isAdmin(), async (req, res, next) => {
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
    if (req.user && +req.user.id === +req.params.id) {
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
            required: false,
            include: [
              {
                model: OrderProduct,
                include: [
                  {
                    model: Product,
                    required: false,
                    as: 'product'
                  }
                ]
              }
            ]
          }
        ]
      })
      res.json(user)
    } else {
      res.status(403).send('Permission Denied')
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
